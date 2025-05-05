import type { FacetedFilter } from "src/model/FacetedFilter";
import { Status, UserType } from "src/model/User";
import { UserRoundCheck, UserRoundX, RefreshCw, Globe } from 'lucide-svelte';

export const filters: FacetedFilter[] = [
    {
        columnName: "status",
        title: "Status",
        options: [{
            label: Status.Active,
            value: Status.Active,
            icon: UserRoundCheck
        },
        {
            label: Status.Disabled,
            value: Status.Disabled,
            icon: UserRoundX
        }]
    },
    {
        columnName: "type",
        title: "Type",
        options: [{
            label: "Lifecyle User",
            value: UserType.NeprofileUser,
            icon: RefreshCw
        }, {
            label: "Portal User",
            value: UserType.NeaccessUser,
            icon: Globe
        },
        ]
    }
]