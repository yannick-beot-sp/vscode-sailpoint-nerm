import * as vscode from "vscode";
import * as constants from "../constants"
import { NERMClientFactory } from "../services/NERMClientFactory";
import { paginator } from "../services/paginator";

/**
 * Base class 
 */
export abstract class BaseTreeItem extends vscode.TreeItem {

    public readonly parentId?: string
    public readonly label: string
    public readonly id?: string

    constructor(
        {
            id,
            label,
            parentId,
            collapsibleState = vscode.TreeItemCollapsibleState.None
        }: {
            id?: string,
            label: string,
            parentId?: string,
            collapsibleState: vscode.TreeItemCollapsibleState
        }
    ) {
        super(label, collapsibleState);
        this.id = id
        this.parentId = parentId
        this.label = label
    }

    getChildren?(clientFactory: NERMClientFactory): Promise<BaseTreeItem[]>


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
    public readonly baseUrl: string
    constructor(
        {
            id,
            parentId,
            label,
            baseUrl
        }: {
            id: string,
            parentId?: string,
            label: string,
            baseUrl: string
        }
    ) {
        super({
            id,
            parentId,
            label,
            collapsibleState: vscode.TreeItemCollapsibleState.Collapsed
        });
        this.baseUrl = baseUrl
    }

    public async getChildren() {
        return [
            new UsersTreeItem(this.id!),
            new RolesTreeItem(this.id!),
            new ProfilesTreeItem(this.id!)
        ]
    }
    contextValue = "tenant"
    iconPath = new vscode.ThemeIcon("organization");

}

export class LinkTreeItem extends BaseTreeItem {
    public readonly path: string;


    constructor(
        {
            tenantId,
            label,
            path
        }: {
            tenantId: string,
            label: string,
            path: string
        }
    ) {
        super({
            parentId: tenantId,
            label,
            collapsibleState: vscode.TreeItemCollapsibleState.None
        });
        this.path = path
        this.contextValue = path
    }

    command = {
        title: "open",
        command: constants.OPEN_WEBVIEW,
        arguments: [this],
    };
}

export class UsersTreeItem extends LinkTreeItem {
    constructor(
        tenantId: string,
    ) {
        super({
            tenantId,
            label: "Users",
            path: "/users"
        });
    }
    iconPath = new vscode.ThemeIcon("person");
}

export class RolesTreeItem extends LinkTreeItem {
    constructor(
        tenantId: string,
    ) {
        super({
            tenantId,
            label: "Roles",
            path: "/roles"
        });
    }
    iconPath = new vscode.ThemeIcon("account");
}

export class ProfilesTreeItem extends BaseTreeItem {
    constructor(
        tenantId: string,
    ) {
        super({
            parentId: tenantId,
            label: "Profiles",
            collapsibleState: vscode.TreeItemCollapsibleState.Collapsed
        });
    }

    contextValue = "profiles"

    public async getChildren(clientFactory: NERMClientFactory) {
        const client = await clientFactory.getClient({
            tenantId: this.parentId!
        })
        const profileTypes = await paginator(client, client.getProfileTypes, { order: "name" })
        return profileTypes?.map(x => new ProfileTreeItem(
            this.parentId!,
            x.id,
            x.name
        ))
    }
}

export class ProfileTreeItem extends LinkTreeItem {
    constructor(
        tenantId: string,
        private readonly profileTypeId: string,
        label: string
    ) {
        super({
            tenantId,
            label,
            path: `/profiles/${profileTypeId}`
        });
        this.resourceUri = vscode.Uri.parse(`/tmp/${tenantId}/profiles/${profileTypeId}`)
    }
    iconPath = new vscode.ThemeIcon("extensions");
}