import * as vscode from 'vscode';
import { TenantService } from './services/TenantService';
import { NERMClient } from './services/NERMClient';
import { GetAllUsersQuery } from './commands/GetAllUsersQuery';
import { IRequest, IRequestHandler } from './commands/interfaces';
import { GetAllRolesQuery } from './commands/GetAllRolesQuery';
import { GetAllUserRolePairingsQuery } from './commands/GetAllUserRolePairingsQuery';
import { RemoveRoleFromUser } from './commands/RemoveRoleFromUser';
import { AddUserRolePairingsCommand } from './commands/AddUserRolePairingsCommand';
import { UpdateUserCommand } from './commands/UpdateUserCommand';
import { DeleteUserCommand } from './commands/DeleteUserCommand';
import { TreeService } from './services/TreeService';
import { GetTableVisibilityStateQuery } from './commands/GetTableVisibilityStateQuery';
import { SetTableVisibilityStateCommand } from './commands/SetTableVisibilityStateCommand';



function getWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewOptions {
    return {
        // Enable javascript in the webview
        enableScripts: true,

        // And restrict the webview to only loading content from our extension's `webview/assets` directory.
        localResourceRoots: [vscode.Uri.joinPath(extensionUri, 'webview', 'assets')]
    };
}

function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

interface PanelParams {
    client: NERMClient,
    treeService: TreeService,
    extensionUri: vscode.Uri,
    tenantId: string
    tenantLabel: string
    path: string
}

export class Panel {

    public static currentPanels: Map<string, Panel> = new Map()
    public static readonly viewType = 'webview';
    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionUri: vscode.Uri;
    private _disposables: vscode.Disposable[] = [];
    private _commands = new Map<string, IRequestHandler<IRequest<unknown>, unknown>>()


    public static createOrShow(
        params: PanelParams
    ) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;
        const panelKey = `${params.tenantId}|${params.path}`
        // If we already have a panel, show it.
        if (Panel.currentPanels.has(panelKey)) {
            const existingPanel = Panel.currentPanels.get(panelKey)!._panel
            const a = existingPanel.active
            existingPanel.reveal(column);
            return;
        }

        // Otherwise, create a new panel.
        const panel = vscode.window.createWebviewPanel(
            Panel.viewType,
            `${params.tenantLabel} | ${params.path.replace("/", " | ")}`,
            column || vscode.ViewColumn.One,
            getWebviewOptions(params.extensionUri)
        );

        Panel.currentPanels.set(panelKey, new Panel(
            panelKey,
            panel,
            params
        ))
    }

    public dispose() {
        Panel.currentPanels.delete(this.panelKey)

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    register(...args: IRequestHandler<IRequest<unknown>, unknown>[]) {
        args.forEach(x => {
            this._commands.set(x.command, x)
        })
    }

    private constructor(
        private panelKey: string,
        panel: vscode.WebviewPanel,
        private params: PanelParams) {
        this._panel = panel;
        this._extensionUri = params.extensionUri;


        this._update()
        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programmatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

        // Update the content based on view changes
        this._panel.onDidChangeViewState(
            () => {
                if (this._panel.visible) {
                    this._update();
                }
            },
            null,
            this._disposables
        );

        this.register(
            new GetAllUsersQuery(params.client),
            new GetAllRolesQuery(params.client),
            new GetAllUserRolePairingsQuery(params.client),
            new AddUserRolePairingsCommand(params.client),
            new RemoveRoleFromUser(params.client),
            new UpdateUserCommand(params.client),
            new DeleteUserCommand(params.client),
            new GetTableVisibilityStateQuery(params.tenantId, params.treeService),
            new SetTableVisibilityStateCommand(params.tenantId, params.treeService),
        )

        // Handle messages from the webview
        this._panel.webview.onDidReceiveMessage(async message => {
            const { command, requestId, payload } = message;
            const handler = this._commands.get(command)
            if (!handler) {
                console.error(`Panel: Invalid command ${command}`)
                return
            }
            const response = await handler.handle(payload)
            this._panel.webview.postMessage({ command, requestId, payload: response });
        },
            null,
            this._disposables
        );
    }

    private _update() {
        const webview = this._panel.webview;
        // Set the webview's initial html content
        // this._panel.title = this.campaignName;
        this._panel.webview.html = this._getHtmlForWebview(this._panel.webview);

    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        // Local path to main script run in the webview
        const scriptPathOnDisk = vscode.Uri.joinPath(this._extensionUri, 'webview', 'assets', 'index.js');

        // And the uri we use to load this script in the webview
        const scriptUri = webview.asWebviewUri(scriptPathOnDisk);

        // Local path to css styles
        // const styleResetPath = vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css');
        const stylesPathMainPath = vscode.Uri.joinPath(this._extensionUri, 'webview', 'assets', 'index.css');

        // Uri to load styles into webview
        // const stylesResetUri = webview.asWebviewUri(styleResetPath);
        const stylesMainUri = webview.asWebviewUri(stylesPathMainPath);

        // Use a nonce to only allow specific scripts to be run
        const nonce = getNonce();

        return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <!--
        Use a content security policy to only allow loading images from https or from our extension directory,
        and only allow scripts that have a specific nonce.
    -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline' ${webview.cspSource}; img-src 'self' data: ${webview.cspSource} https:; script-src 'nonce-${nonce}';">

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Certification Campaign</title>
    <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
    <link href="${stylesMainUri}" rel="stylesheet">
  </head>
  <body>
    <div id="app"></div>
    <script nonce="${nonce}">
      window.data=${JSON.stringify(this.params)};
    </script>
  </body>
</html>`;
    }
}    