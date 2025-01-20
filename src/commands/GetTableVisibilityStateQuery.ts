import { TreeService } from "../services/TreeService";
import { IRequest, IRequestHandler } from "./interfaces";

export interface GetTableVisibilityStateRequest extends IRequest<Record<string, boolean> | undefined> {
    tableName: string,

}

export class GetTableVisibilityStateQuery implements IRequestHandler<GetTableVisibilityStateRequest, Record<string, boolean> | undefined> {
    public readonly command = "getTableVisibilityState"

    constructor(private tenantId: string, private treeService: TreeService) { }

    async handle(request: GetTableVisibilityStateRequest): Promise<Record<string, boolean> | undefined> {
        const node = this.treeService.get(this.tenantId);
        return node?.tableViews?.[request.tableName]
    }
}