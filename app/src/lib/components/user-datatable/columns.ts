import type { ColumnDef } from "@tanstack/table-core";
import type { User } from "src/model/User";
import { renderComponent } from "../ui/data-table";
import ColumnStatus from "./column-status.svelte";
import Actions from "./actions.svelte";
import SortableHeader from "./sortable-header.svelte";


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
        id: "login",
        accessorKey: "login",
        header: ({ column }) =>
            renderComponent(SortableHeader, {
                onclick: () => column.toggleSorting(column.getIsSorted() === "asc"),
                label: "Login"
            }),
    },
    {
        id: "status",
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            return renderComponent(ColumnStatus, {
                status: row.original.status,
            });
        },
    },
    {
        id: "email",
        accessorKey: "email",
        header: ({ column }) =>
            renderComponent(SortableHeader, {
                onclick: () => column.toggleSorting(column.getIsSorted() === "asc"),
                label: "Email"
            }),
    },
    {
        id: "id",
        accessorKey: "id",
        header: "ID",
        isVisibleByDefault: false
    },
    {
        id: "title",
        accessorKey: "title",
        header: "Title",
        isVisibleByDefault: false
    },
    {
        id: "type",
        accessorKey: "type",
        header: "Type",
        isVisibleByDefault: false
    },
    {
        id: "last_login",
        accessorKey: "last_login",
        header: "Last Login",
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