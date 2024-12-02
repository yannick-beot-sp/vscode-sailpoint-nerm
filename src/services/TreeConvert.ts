import { BaseTreeItem, FolderTreeItem, TenantTreeItem } from "../models/TreeModel";
import { IStoredNode } from "./TreeService";

export class TreeConvert {

    public static toTreeItem(node: IStoredNode): BaseTreeItem {
        switch (node.type) {
            case "FOLDER":
                return new FolderTreeItem({
                    id: node.id,
                    label: node.label,
                    parentId: node.parentId
                })
                break;

            case "TENANT":
                return new TenantTreeItem({
                    id: node.id,
                    label: node.label,
                    parentId: node.parentId
                })
                break;
        }
        // throw new Error(`Invalid type: ${node.type}`);

    }
}