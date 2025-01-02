import type { ColumnDef } from "@tanstack/table-core";
import type { User } from "src/model/User";
import { createRawSnippet } from "svelte";
import { renderComponent, renderSnippet } from "../ui/data-table";
import ColumnStatus from "./column-status.svelte";

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "login",
        header: "Login",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            return renderComponent(ColumnStatus, {
                status: row.original.status,
            });
        },
    },
    {
        accessorKey: "email",
        header: "Email",
    }
];