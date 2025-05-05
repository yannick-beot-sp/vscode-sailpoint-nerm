import type { FacetedFilter } from "src/model/FacetedFilter";

import { ShieldCheck, ShieldAlert, ShieldBan, ShieldX } from 'lucide-svelte';
import { Status } from "src/model/Profile";

export const filters: FacetedFilter[] = [
    {
        columnName: "status",
        title: "Status",
        options: [{
            label: Status.Active,
            value: Status.Active,
            icon: ShieldCheck
        },
        {
            label: Status.Inactive,
            value: Status.Inactive,
            icon: ShieldX
        },
        {
            label: Status["On Leave"],
            value: Status["On Leave"],
            icon: ShieldAlert
        },
        {
            label: Status.Terminated,
            value: Status.Terminated,
            icon: ShieldBan
        }]
    }
]