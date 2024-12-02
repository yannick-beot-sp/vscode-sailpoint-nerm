import * as vscode from "vscode";

import * as crypto from 'crypto';

/**
 * Base class 
 */
export abstract class BaseTreeItem extends vscode.TreeItem {

    public readonly parentId?: string

    constructor(
        {
            id,
            label,
            parentId,
            collapsibleState = vscode.TreeItemCollapsibleState.None
        }: {
            id: string,
            label: string,
            parentId?: string,
            collapsibleState: vscode.TreeItemCollapsibleState
        }
    ) {
        super(label, collapsibleState);
        this.id = id
    }

    getChildren?(): Promise<BaseTreeItem[]>


}

export class FolderTreeItem extends BaseTreeItem {
    constructor(
        {
            id,
            parentId,
            label,
        }: {
            id: string,
            parentId?: string,
            label: string,
        }
    ) {
        super({
            id,
            parentId,
            label,
            collapsibleState: vscode.TreeItemCollapsibleState.Collapsed
        });
        // enforce display of a folder
        this.resourceUri = vscode.Uri.parse(`/tmp/${id}`)
    }
    contextValue = "folder"
}

export class TenantTreeItem extends BaseTreeItem {
    constructor(
        {
            id,
            parentId,
            label,
        }: {
            id: string,
            parentId?: string,
            label: string,
        }
    ) {
        super({
            id,
            parentId,
            label,
            collapsibleState: vscode.TreeItemCollapsibleState.Collapsed
        });
    }

    public async getChildren() {
        return [
            new UsersTreeItem(this.id!),
            new RolesTreeItem(this.id!),
            new ProfilesTreeItem(this.id!)
        ]
    }
    contextValue = "tenant"
    iconPath = "organization"

}

export class LinkTreeItem extends BaseTreeItem {
    constructor(
        {
            tenantId,
            label,
        }: {
            tenantId: string,
            label: string,
        }
    ) {
        super({
            id: crypto.randomUUID(),
            parentId: tenantId,
            label,
            collapsibleState: vscode.TreeItemCollapsibleState.None
        });
    }
}

export class UsersTreeItem extends LinkTreeItem {
    constructor(
        tenantId: string,
    ) {
        super({
            tenantId,
            label: "Users"
        });
    }
    iconPath = "person"
    contextValue = "users"
}

export class RolesTreeItem extends LinkTreeItem {
    constructor(
        tenantId: string,
    ) {
        super({
            tenantId,
            label: "Roles"
        });
    }
    iconPath = "account"
    contextValue = "roles"
}

export class ProfilesTreeItem extends LinkTreeItem {
    constructor(
        tenantId: string,
    ) {
        super({
            tenantId,
            label: "Profiles"
        });
    }
    iconPath = "extensions"
    contextValue = "profiles"
}