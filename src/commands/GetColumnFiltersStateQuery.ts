import { ColumnFiltersState, TreeService } from "../services/TreeService";
import { IRequest, IRequestHandler } from "./interfaces";

export interface GetColumnFiltersStateRequest extends IRequest<Record<string, boolean> | undefined> {
    tableName: string,
}

export class GetColumnFiltersStateQuery implements IRequestHandler<GetColumnFiltersStateRequest, ColumnFiltersState | undefined> {
    public readonly command = "getColumnFiltersState"

    constructor(private tenantId: string, private treeService: TreeService) { }

    async handle(request: GetColumnFiltersStateRequest): Promise<ColumnFiltersState | undefined> {
        const node = this.treeService.get(this.tenantId);
        return node?.tableColumnFilters?.[request.tableName]
    }
}