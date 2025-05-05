import { ColumnFiltersState, TreeService } from "../services/TreeService";
import { IRequest, IRequestHandler } from "./interfaces";

export interface SetColumnFiltersStateRequest extends IRequest<void> {
    tableName: string
    columnFiltersState: ColumnFiltersState
}

export class SetColumnFiltersStateCommand implements IRequestHandler<SetColumnFiltersStateRequest, void> {
    public readonly command = "setColumnFiltersState"

    constructor(private tenantId: string, private treeService: TreeService) { }

    async handle(request: SetColumnFiltersStateRequest): Promise<void> {
        const node = this.treeService.get(this.tenantId);
        if (node) {
            if (node.tableColumnFilters) {
                node.tableColumnFilters[request.tableName] = request.columnFiltersState
            } else {
                node.tableColumnFilters = {
                    [request.tableName]: request.columnFiltersState
                }
            }
            this.treeService.addOrUpdate(node)
        }
    }
}