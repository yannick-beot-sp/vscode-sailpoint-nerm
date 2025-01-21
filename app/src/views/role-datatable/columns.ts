import type { ColumnDef } from "@tanstack/table-core";
import type { User } from "src/model/User";
import { renderComponent } from "$lib/components/ui/data-table";
import Actions from "./actions.svelte";
import SortableHeader from "../user-datatable/sortable-header.svelte";


export type MyColumnDef<TData> = ColumnDef<TData> & {
    isVisibleByDefault?: boolean;
};

export const columns: MyColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: ({ column }) =>
            renderComponent(SortableHeader, {
                onclick: () => column.toggleSorting(column.getIsSorted() === "asc"),
                label: "Name"
            }),
        enableHiding: false
    },
    {
        id: "id",
        accessorKey: "id",
        header: "ID",
        isVisibleByDefault: false
    },
    {
        id: "actions",
        cell: ({ row, table }) => {
            return renderComponent(Actions, { row, table });
        },
        enableHiding: false
    },
];