import * as vscode from 'vscode';
import * as constants from './constants';
import { IStoredNode, TreeService } from './services/TreeService';
import { BaseTreeItem } from './models/TreeModel';
import { TreeConvert } from './services/TreeConvert';

export class NERMView implements vscode.TreeDataProvider<BaseTreeItem>, vscode.TreeDragAndDropController<Node> {
    private _onDidChangeTreeData: vscode.EventEmitter<(BaseTreeItem | undefined)[] | undefined> = new vscode.EventEmitter<BaseTreeItem[] | undefined>();
    // We want to use an array as the event type, but the API for this is currently being finalized. Until it's finalized, use any.
    public onDidChangeTreeData: vscode.Event<any> = this._onDidChangeTreeData.event;
    dropMimeTypes: readonly string[] = [constants.DROP_MIME_TYPE];
    dragMimeTypes: readonly string[] = ["text/uri-list"];

    public tree: any = {
        'a': {
            'aa': {
                'aaa': {
                    'aaaa': {
                        'aaaaa': {
                            'aaaaaa': {}
                        }
                    }
                }
            },
            'ab': {}
        },
        'b': {
            'ba': {},
            'bb': {}
        }
    };
    // Keep track of any nodes we create so that we can re-use the same objects.
    private nodes: Map<string, BaseTreeItem> = new Map();

    private treeService: TreeService


    constructor(context: vscode.ExtensionContext) {

        context.subscriptions.push(
            vscode.commands.registerCommand(constants.NEW_FOLDER_ROOT, async () => {
                await this.newFolder()
            }));
        context.subscriptions.push(
            vscode.commands.registerCommand(constants.NEW_FOLDER, this.newFolder, this));

        context.subscriptions.push(
            vscode.window.createTreeView(
                constants.VIEW_CONTAINER_ID,
                { treeDataProvider: this, showCollapseAll: true, canSelectMany: false, dragAndDropController: this })
        );

        this.treeService = new TreeService(context.globalState)
    }

    // Tree data provider 

    public getChildren(element: BaseTreeItem): BaseTreeItem[] {
        let nodes: IStoredNode[] = []
        if (element) {
            nodes = this.treeService.getChildren(element.id!)
        } else {
            nodes = this.treeService.getRoots()
        }
        return nodes?.map(x => this._getNode(x.id, x)) ?? []
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

    public getTreeItem(element: BaseTreeItem): vscode.TreeItem {
        return element;
    }

    public getParent(element: BaseTreeItem): BaseTreeItem | undefined {
        if (element.parentId) {
            return this._getNode(element.parentId)
        }
        return undefined
    }

    public async newFolder(element?: BaseTreeItem): Promise<void> {
        const folderName = await vscode.window.showInputBox({ title: "New folder", placeHolder: "folder name" });
        if (!folderName) {
            return;
        }

        const newFolder: IStoredNode = {
            id: crypto.randomUUID(),
            parentId: element?.id,
            label: folderName,
            type: "FOLDER"
        }
        await this.treeService.addOrUpdate(newFolder)
        this.nodes.set(newFolder.id, TreeConvert.toTreeItem(newFolder))
        this._onDidChangeTreeData.fire(element ? [element] : undefined);
    }

    dispose(): void {
        // nothing to dispose
    }

    // Drag and drop controller

    public async handleDrop(target: Node | undefined, sources: vscode.DataTransfer, _token: vscode.CancellationToken): Promise<void> {
        const transferItem = sources.get(constants.DROP_MIME_TYPE);
        if (!transferItem) {
            return;
        }
        /*
        const treeItems: Node[] = transferItem.value;
        let roots = this._getLocalRoots(treeItems);
        // Remove nodes that are already target's parent nodes
        roots = roots.filter(r => !this._isChild(this._getTreeElement(r.key), target));
        if (roots.length > 0) {
            // Reload parents of the moving elements
            const parents = roots.map(r => this.getParent(r));
            roots.forEach(r => this._reparentNode(r, target));
            this._onDidChangeTreeData.fire([...parents, target]);
        }*/
    }

    public async handleDrag(source: Node[], treeDataTransfer: vscode.DataTransfer, _token: vscode.CancellationToken): Promise<void> {
        treeDataTransfer.set(constants.DROP_MIME_TYPE, new vscode.DataTransferItem(source));
    }
}

interface Node {
    key: string;
}

class Key {
    constructor(readonly key: string) { }
}