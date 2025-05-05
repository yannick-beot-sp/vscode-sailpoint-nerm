import type { ColumnDef } from "@tanstack/table-core";
import { renderComponent } from "$lib/components/ui/data-table";
import Actions from "./actions.svelte";
import SortableHeader from "../user-datatable/sortable-header.svelte";
import type { Client } from "src/services/Client";
import type { Profile } from "src/model/Profile";
import { compare } from "$lib/utils/stringUtils";
import type { Attribute } from "src/model/Attribute";


export type MyColumnDef<TData> = ColumnDef<TData> & {
    isVisibleByDefault?: boolean;
};

const commonColumns: MyColumnDef<Profile>[] = [
    {
        accessorKey: "name",
        header: ({ column }) =>
            renderComponent(SortableHeader, {
                onclick: () => column.toggleSorting(column.getIsSorted() === "asc"),
                label: "Name"
            }),
        enableHiding: true
    },
    {
        id: "status",
        accessorKey: "status",
        header: "Status",
        enableHiding: true,
        filterFn: "arrIncludesSome"
    },
    {
        id: "id_proofing_status",
        accessorKey: "id_proofing_status",
        header: "Identity Proofing",
        enableHiding: true
    },
    {
        id: "id",
        accessorKey: "id",
        header: "ID",
        isVisibleByDefault: false
    },
];


const actionColumn: MyColumnDef<Profile> = {
    id: "actions",
    cell: ({ row, table }) => {
        return renderComponent(Actions, { row, table });
    },
    enableHiding: false
}


export async function getColumns(client: Client, attrs: Attribute[]): Promise<MyColumnDef<Profile>[]> {
    const columns = [...commonColumns]

    columns.push(...attrs.map(x => ({
        id: x.uid,
        accessorKey: `attributes.${x.uid}`,
        header: x.label,
        isVisibleByDefault: false
    })).sort((a, b) => compare(a.header, b.header)))
    columns.push(actionColumn)
    return columns
}   
