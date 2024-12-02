import { Memento } from "vscode"

const KEY_PREFIX = "TREE_"

export type StoredNodeType = "FOLDER" | "TENANT"

export interface IStoredNode {
    readonly id: string,
    readonly label: string,
    readonly type: StoredNodeType
    readonly parentId?: string
}

export class StoredNode implements IStoredNode {
    public readonly id: string
    public readonly label: string
    public readonly type: StoredNodeType
    public readonly parentId?: string

    constructor({ id, label, type, parentId }: IStoredNode) {
        this.id = id
        this.label = label
        this.type = type
        this.parentId = parentId
    }

    get isRoot(): boolean {
        return this.parentId === undefined;
    }
}

export class TreeService {
    constructor(private storage: Memento) {
    }

    public getRoots(): IStoredNode[] {
         const a = this.storage.keys()
            .filter(x => x.startsWith(KEY_PREFIX))

        return a.map(x => new StoredNode(this.storage.get<IStoredNode>(x)!))
            .filter(x => x.isRoot)
    }

    public getChildren(id: string): IStoredNode[] {
        return this.storage.keys()
            .filter(x => x.startsWith(KEY_PREFIX))
            .map(x => new StoredNode(this.storage.get<IStoredNode>(x)!))
            .filter(x => x.parentId === id)
    }

    public get(id: string): IStoredNode|undefined {
        return this.storage.get(this._getKey(id) )
    }

    public async addOrUpdate(node: IStoredNode) {
        await this.storage.update(
            this._getKey(node.id),
            node
        )
    }

    public async remove(id: string):Promise<void> {
        const children = this.getChildren(id)
        if (children) {
            for await (const element of children) {
                this.remove(element.id)
            }
        }
        // remove
        await this.storage.update(
            this._getKey(id),
            undefined
        )
    }

    private _getKey(id: string): string {
        return KEY_PREFIX + id
    }
}