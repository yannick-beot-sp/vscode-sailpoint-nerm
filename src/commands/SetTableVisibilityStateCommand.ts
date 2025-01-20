import { TreeService, VisibilityState } from "../services/TreeService";
import { IRequest, IRequestHandler } from "./interfaces";

export interface SetTableVisibilityStateRequest extends IRequest<void> {
    tableName: string
    visibilityState: VisibilityState
}

export class SetTableVisibilityStateCommand implements IRequestHandler<SetTableVisibilityStateRequest, void> {
    public readonly command = "setTableVisibilityState"

    constructor(private tenantId: string, private treeService: TreeService) { }

    async handle(request: SetTableVisibilityStateRequest): Promise<void> {
        const node = this.treeService.get(this.tenantId);
        if (node) {
            if (node.tableViews) {
                node.tableViews[request.tableName] = request.visibilityState
            } else {
                node.tableViews = {
                    [request.tableName]: request.visibilityState
                }
            }
            this.treeService.addOrUpdate(node)
        }
    }
}