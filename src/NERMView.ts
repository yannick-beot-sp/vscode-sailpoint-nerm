import * as vscode from 'vscode';
import * as constants from './constants';
import { IStoredNode, TreeService } from './services/TreeService';
import { BaseTreeItem, FolderTreeItem, LinkTreeItem, TenantTreeItem } from './models/TreeModel';
import { TreeConvert } from './services/TreeConvert';
import { TenantService } from './services/TenantService';
import { isBlank, isEmpty } from './utils/stringUtils';
import { NERMClientFactory } from './services/NERMClientFactory';
import { confirm } from './utils/vsCodeHelpers';
import { Panel } from './Panel';

export class NERMView implements vscode.TreeDataProvider<BaseTreeItem>, vscode.TreeDragAndDropController<BaseTreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<(BaseTreeItem | undefined)[] | undefined> = new vscode.EventEmitter<BaseTreeItem[] | undefined>();
    // We want to use an array as the event type, but the API for this is currently being finalized. Until it's finalized, use any.
    public onDidChangeTreeData: vscode.Event<any> = this._onDidChangeTreeData.event;
    dropMimeTypes: readonly string[] = [constants.DROP_MIME_TYPE];
    dragMimeTypes: readonly string[] = ["text/uri-list"];
    // Keep track of any nodes we create so that we can re-use the same objects.
    private nodes: Map<string, BaseTreeItem> = new Map();

    private readonly treeService: TreeService
    private readonly tenantService: TenantService
    private readonly clientFactory: NERMClientFactory

    private readonly extensionUri: vscode.Uri

    ////////////////////////////////
    //#region Constructor
    ////////////////////////////////

    constructor(context: vscode.ExtensionContext) {

        context.subscriptions.push(
            vscode.commands.registerCommand(constants.NEW_FOLDER_ROOT, async () => {
                await this.newFolder()
            }));
        context.subscriptions.push(
            vscode.commands.registerCommand(constants.NEW_FOLDER, this.newFolder, this));

        context.subscriptions.push(
            vscode.commands.registerCommand(constants.NEW_TENANT_ROOT, async () => {
                await this.newTenant()
            }));
        context.subscriptions.push(
            vscode.commands.registerCommand(constants.NEW_TENANT, this.newTenant, this));

        context.subscriptions.push(
            vscode.commands.registerCommand(constants.RENAME, this.rename, this));
        context.subscriptions.push(
            vscode.commands.registerCommand(constants.REFRESH, this.refresh, this));
        context.subscriptions.push(
            vscode.commands.registerCommand(constants.REMOVE, this.remove, this));

        context.subscriptions.push(
            vscode.commands.registerCommand(constants.OPEN_WEBVIEW, this.openWebview, this));

        context.subscriptions.push(
            vscode.window.createTreeView(
                constants.VIEW_CONTAINER_ID,
                { treeDataProvider: this, showCollapseAll: true, canSelectMany: false, dragAndDropController: this })
        );

        this.treeService = new TreeService(context.globalState)
        this.tenantService = new TenantService(context.secrets)
        this.clientFactory = new NERMClientFactory(this.treeService, this.tenantService)
        this.extensionUri = context.extensionUri
    }

    ////////////////////////////////
    //#endregion Constructor
    ////////////////////////////////

    ////////////////////////////////
    //#region Tree data provider 
    ////////////////////////////////

    public async getChildren(element: BaseTreeItem): Promise<BaseTreeItem[]> {
        let nodes: IStoredNode[] = []
        if (element) {
            if (element.getChildren) {
                return await element.getChildren()
            } else {
                nodes = this.treeService.getChildren(element.id!)
            }
        } else {
            nodes = this.treeService.getRoots()
        }
        return nodes?.map(x => this._getNode(x.id, x)) ?? []
    }

    public getTreeItem(element: BaseTreeItem): vscode.TreeItem {
        return element;
    }

    public getParent(element: BaseTreeItem): BaseTreeItem | undefined {
        if (element.parentId) {
            return this._getNode(element.parentId)
        }
        return undefined
    }


    dispose(): void {
        // nothing to dispose
    }
    ////////////////////////////////
    //#endregion Tree data provider 
    ////////////////////////////////

    /////////////////////////////////////
    //#region Drag and drop controller
    /////////////////////////////////////

    public async handleDrop(target: BaseTreeItem | undefined, sources: vscode.DataTransfer, _token: vscode.CancellationToken): Promise<void> {
        const transferItem = sources.get(constants.DROP_MIME_TYPE);
        if (!transferItem) {
            return;
        }

        const treeItems: BaseTreeItem[] = transferItem.value;
        for (const item of treeItems) {
            const node = this.treeService.get(item.id)
            if (node === undefined) {
                return
            }
            node.parentId = target?.id
            this._addNode(
                node,
                target?.parentId ? this._getNode(target?.parentId) : undefined) // try to get parentid for refresh
        }

    }

    public async handleDrag(source: BaseTreeItem[], treeDataTransfer: vscode.DataTransfer, _token: vscode.CancellationToken): Promise<void> {
        source = source.filter(x => x instanceof TenantTreeItem || x instanceof FolderTreeItem)
        if (source && source.length > 0) {
            treeDataTransfer.set(constants.DROP_MIME_TYPE, new vscode.DataTransferItem(source));
        }
    }

    /////////////////////////////////////
    //#endregion Drag and drop controller
    /////////////////////////////////////

    /////////////////////
    //#region Commands
    /////////////////////

    public async rename(element: BaseTreeItem): Promise<void> {
        const name = await vscode.window.showInputBox({
            title: "Rename",
            placeHolder: "folder name",
            value: element.label
        });

        if (isBlank(name)) {
            return
        }
        const node = this.treeService.get(element.id)
        if (node === undefined) {
            return
        }
        node.label = name!.trim()
        this._addNode(
            node,
            element.parentId ? this._getNode(element.parentId) : undefined) // try to get parentid for refresh
    }

    public async newFolder(element?: BaseTreeItem): Promise<void> {
        const folderName = await vscode.window.showInputBox({ title: "New folder", placeHolder: "folder name" });
        if (!folderName) {
            return;
        }

        await this._addNode({
            id: crypto.randomUUID(),
            parentId: element?.id,
            label: folderName,
            type: "FOLDER"
        }, element)
    }

    public async newTenant(element?: BaseTreeItem): Promise<void> {
        let tenantDisplayName = await vscode.window.showInputBox({ title: "New Tenant (1/3)", placeHolder: "display name" });
        tenantDisplayName = tenantDisplayName?.trim()
        if (isEmpty(tenantDisplayName)) {
            return;
        }

        let baseUrl = await vscode.window.showInputBox({
            ignoreFocusOut: true,
            placeHolder: 'https://companyname.nonemployee.com/api',
            prompt: "Enter the base URL",
            title: 'New Tenant (2/3)',
            validateInput: text => {

                const regex = new RegExp('^https:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$');
                if (regex.test(text)) {
                    return null;
                }
                return "Invalid base URL";
            }
        });
        if (baseUrl === undefined) { return }
        baseUrl = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';

        const apiKey = await vscode.window.showInputBox({
            password: true,
            ignoreFocusOut: true,
            placeHolder: '***',
            prompt: 'Enter the API key.',
            title: 'New Tenant (2/3)',
            validateInput: text => {
                const regex = new RegExp('^[a-f0-9]{32}$');
                if (regex.test(text)) {
                    return null;
                }
                return "Invalid API key";
            }
        });
        if (apiKey === undefined) { return }

        const client = await this.clientFactory.getClient({
            baseUrl,
            token: apiKey
        })

        try {
            await client.testConnection()
        } catch (error) {
            console.error(error);
            vscode.window.showErrorMessage(`Could not create tenant ${tenantDisplayName}: ${error}`)
            return
        }


        const randomUUID = crypto.randomUUID()
        await this.tenantService.addOrUpdate(randomUUID, apiKey)

        await this._addNode({
            id: randomUUID,
            parentId: element?.id,
            label: tenantDisplayName!,
            type: "TENANT",
            baseUrl: baseUrl
        }, element)
        vscode.window.showInformationMessage(`Tenant ${tenantDisplayName} successfully added`)
    }

    public async openWebview(element: LinkTreeItem): Promise<void> {
        const tenantId = element.parentId!
        const tenantInfo = this.treeService.get(tenantId)

        const apiKey = await this.tenantService.get(tenantId)

        if (!tenantInfo || !apiKey) { return }

        const client = await this.clientFactory.getClient({
            baseUrl: tenantInfo.baseUrl!,
            token: apiKey
        })
        Panel.createOrShow({
            tenantId,
            tenantLabel: tenantInfo.label,
            path: element.path,
            label: element.label,
            client,
            extensionUri: this.extensionUri,
            treeService: this.treeService
        })
    }

    refresh(node?: BaseTreeItem): void {
        console.log('> ISCDataProvider.refresh');
        if (node) {
            this._onDidChangeTreeData.fire([node]);
        } else {
            this._onDidChangeTreeData.fire(undefined);
        }
    }

    async remove(node: BaseTreeItem): Promise<void> {
        if (!(await confirm(`Are you sure you want to remove ${node.label}${node instanceof FolderTreeItem ? " and all its content" : ""}?`))) {
            console.log("< EscalateCertificationCommand.execute: no reassignment");
            return
        }

        const storedNode = this.treeService.get(node.id)
        if (!storedNode) { return }
        this._removeNode(storedNode)
        this.refresh(node?.parentId ? this._getNode(node?.parentId) : undefined)

    }
    private async _removeNode(node: IStoredNode) {
        if (node.type === "TENANT") {
            this.tenantService.remove(node.id)
            this.treeService.remove(node.id)
        } else {
            // FOLDER
            const children = this.treeService.getChildren(node.id)
            if (children) {
                for (const child of children) {
                    this._removeNode(child)
                }
            }
            this.treeService.remove(node.id)
        }
    }

    /////////////////////
    //#endregion Commands
    /////////////////////

    /////////////////////////////
    //#region Private methods
    /////////////////////////////

    async _addNode(node: IStoredNode, parent: BaseTreeItem | undefined) {
        await this.treeService.addOrUpdate(node)
        this.nodes.set(node.id, TreeConvert.toTreeItem(node))
        this.refresh(parent)
    }

    _getNode(key: string, node?: IStoredNode): BaseTreeItem {

        if (this.nodes.has(key)) {
            return this.nodes.get(key)!
        }
        if (node === undefined) {
            node = this.treeService.get(key)
        }
        const treeItem = TreeConvert.toTreeItem(node!)
        this.nodes.set(key, treeItem)
        return treeItem;
    }
    /////////////////////////////
    //#endregion Private methods
    /////////////////////////////
}