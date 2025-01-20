import type { Status, User } from "src/model/User";
import type { Client } from "./Client";
import type { Role } from "src/model/Role";
import type { UserRolePair } from "src/model/UserRolePair";
import type { NewUserRolePair } from "src/model/NewUserRolePair";
import type { VisibilityState } from "@tanstack/table-core";

function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function stall() {
    const stallTime = getRandomInt(500, 3000);
    await new Promise((resolve) => setTimeout(resolve, stallTime));
}
const firstNames = [
    "Emma",
    "James",
    "Sophia",
    "Michael",
    "Olivia",
    "William",
    "Ava",
    "John",
    "Isabella",
    "David",
];
const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
];
const statuses: Status[] = ["Active", "Disabled"];

const roles: Role[] = [
    {
        "id": "3205bdb2-cde1-4f24-98c2-02c00111b7ca",
        "uid": "b3_system_configuration_admins_neprofile_role",
        "name": "System Configuration Admins",
        "groups": [
            "System Configuration Admins"
        ]
    },
    {
        "id": "322b4dbb-9956-48cc-b6b1-86bcc43d4fd4",
        "uid": "b3_department_approvers_neprofile_role",
        "name": "Department Approvers",
        "groups": [
            "Department Approvers"
        ]
    },
    {
        "id": "396efe69-fd6e-4c1f-ad26-a09f3356de97",
        "uid": "396efe69fd6e4c1fad26a09f3356de97",
        "name": "Beta Corp Collaborators",
        "groups": [
            "Beta Corp Collaborators"
        ]
    },
    {
        "id": "4b7c23b2-1dc8-484c-b5e2-c09850c400e9",
        "uid": "4b7c23b21dc8484cb5e2c09850c400e9",
        "name": "Nursing Services Collaborators",
        "groups": [
            "Nursing Services Collaborators"
        ]
    },
    {
        "id": "4bf317d8-1393-4d52-a871-00f712dda2b0",
        "uid": "b3_location_admins_neprofile_role",
        "name": "Location Admins",
        "groups": [
            "Location Admins"
        ]
    },
    {
        "id": "4fe44c44-6ead-4208-92bf-cef0892077cc",
        "uid": "4fe44c446ead420892bfcef0892077cc",
        "name": "City College Collaborators",
        "groups": [
            "City College Collaborators"
        ]
    },
    {
        "id": "53e2bb4e-66af-43ec-8688-8eebe4554a10",
        "uid": "53e2bb4e66af43ec86888eebe4554a10",
        "name": "Department of Nursing Collaborators",
        "groups": [
            "Department of Nursing Collaborators"
        ]
    },
    {
        "id": "5720f45a-aaab-4edc-811a-2df2122049b5",
        "uid": "b3_organization_admins_neprofile_role",
        "name": "Organization Admins",
        "groups": [
            "Organization Admins"
        ]
    },
    {
        "id": "690f7190-619f-4e53-96d4-2e358666a9be",
        "uid": "b3_nonhuman_owners_neprofile_role",
        "name": "Non-Human Owners",
        "groups": [
            "Non-Human Owners"
        ]
    },
    {
        "id": "7a077770-fbf1-4f46-b82e-5c0a4da78e0c",
        "uid": "7a077770fbf14f46b82e5c0a4da78e0c",
        "name": "Staff Augmentation Collaborators",
        "groups": [
            "Staff Augmentation Collaborators"
        ]
    },
    {
        "id": "7a9fbafc-3e7d-44f1-bc8a-d4d8c631d578",
        "uid": "7a9fbafc3e7d44f1bc8ad4d8c631d578",
        "name": "Business Services Collaborators",
        "groups": [
            "Business Services Collaborators"
        ]
    },
    {
        "id": "7d8f2309-615e-4706-a5c2-457c8d534441",
        "uid": "b3_population1_management_neprofile_role",
        "name": "Population1 Management",
        "groups": [
            "Population1 Management"
        ]
    },
    {
        "id": "7dceabc1-1788-467e-b4e0-48ae5c8a5662",
        "uid": "b3_department_admins_neprofile_role",
        "name": "Department Admins",
        "groups": [
            "Department Admins"
        ]
    },
    {
        "id": "872f424a-0095-4025-990f-deae3fdd1c12",
        "uid": "b3_all_suborganization_collaborators_neaccess_role",
        "name": "All Sub-Organization Collaborators",
        "groups": [
            "All Sub-Organization Collaborators"
        ]
    },
    {
        "id": "8b060b9b-fa92-454f-8576-38834edd1dc4",
        "uid": "8b060b9bfa92454f857638834edd1dc4",
        "name": "Department of Journalism Collaborators",
        "groups": [
            "Department of Journalism Collaborators"
        ]
    },
    {
        "id": "8ec7f6e7-2598-4aac-a9a0-9f758f765feb",
        "uid": "b3_population5_management_neprofile_role",
        "name": "Population5 Management",
        "groups": [
            "Population5 Management"
        ]
    },
    {
        "id": "a75186be-2620-4bbe-af6a-3178f8fabafd",
        "uid": "b3_all_organization_collaborators_neaccess_role",
        "name": "All Organization Collaborators",
        "groups": [
            "All Organization Collaborators"
        ]
    },
    {
        "id": "a9af04ec-fdb8-45b1-aa4e-b550a9a200c4",
        "uid": "b3_organization_sponsor_neprofile_role",
        "name": "Organization Sponsors",
        "groups": [
            "Organization Sponsors"
        ]
    },
    {
        "id": "ac3453f2-28d5-4181-96a3-3010869775c2",
        "uid": "b3_population2_management_neprofile_role",
        "name": "Population2 Management",
        "groups": [
            "Population2 Management"
        ]
    },
    {
        "id": "addfcdac-e956-4cd6-9266-74064d13c4b7",
        "uid": "b3_population8_management_neprofile_role",
        "name": "Population8 Management",
        "groups": [
            "Population8 Management"
        ]
    },
    {
        "id": "ae0baff0-debe-4cdd-b2ac-88d260aaa0ff",
        "uid": "ae0baff0debe4cddb2ac88d260aaa0ff",
        "name": "Zeta Services Collaborators",
        "groups": [
            "Zeta Services Collaborators"
        ]
    },
    {
        "id": "b4ed7d1b-e417-46e2-a57a-33bb8c0ce0ed",
        "uid": "b3_sponsors_neprofile_role",
        "name": "Sponsors",
        "groups": [
            "Sponsors"
        ]
    },
    {
        "id": "b65e5cc9-80c6-4e87-ac73-5ba63516abe0",
        "uid": "b3_population4_management_neprofile_role",
        "name": "Population4 Management",
        "groups": [
            "Population4 Management"
        ]
    },
    {
        "id": "b6cf7d54-d04e-488f-80e0-ce14d496af13",
        "uid": "b3_nonhuman_type_approvers_neprofile_role",
        "name": "Non-Human Type Approvers",
        "groups": [
            "Non-Human Type Approvers"
        ]
    },
    {
        "id": "bd21a35c-48a9-498b-89de-1d0d26a473a5",
        "uid": "bd21a35c48a9498b89de1d0d26a473a5",
        "name": "Business School Collaborators",
        "groups": [
            "Business School Collaborators"
        ]
    },
    {
        "id": "bdc60c09-6193-40f4-9ef3-f3e4a5dd91f8",
        "uid": "b3_population3_management_neprofile_role",
        "name": "Population3 Management",
        "groups": [
            "Population3 Management"
        ]
    },
    {
        "id": "c0c847df-c086-4707-a424-6bfe65ad17fe",
        "uid": "nerm_administrator_neprofile_role",
        "name": "NERM Administrator",
        "groups": [
            "NE Admin",
            "SailPoint",
            "ORG_ADMIN"
        ]
    },
    {
        "id": "c3d9e334-b6f8-494f-80df-0916582f812f",
        "uid": "b3_population9_management_neprofile_role",
        "name": "Population9 Management",
        "groups": [
            "Population9 Management"
        ]
    },
    {
        "id": "ca74a221-64e0-4288-bdcc-86bff0871b00",
        "uid": "b3_population10_management_neprofile_role",
        "name": "Population10 Management",
        "groups": [
            "Population10 Management"
        ]
    },
    {
        "id": "cd07ad38-a7ac-4d18-832f-4dfceba41950",
        "uid": "b3_nonhuman_management_neprofile_role",
        "name": "Non-Human Management",
        "groups": [
            "Non-Human Management"
        ]
    },
    {
        "id": "cdc7e5c6-600b-4f97-82ab-a54228d1add9",
        "uid": "b3_population6_management_neprofile_role",
        "name": "Population6 Management",
        "groups": [
            "Population6 Management"
        ]
    },
    {
        "id": "d167ca01-8d6e-410d-a859-a2bfbc7f9384",
        "uid": "b3_people_management_neprofile_role",
        "name": "People Management",
        "groups": [
            "People Management"
        ]
    },
    {
        "id": "e3978524-04cb-4715-b9a4-5d6b6bdeab9f",
        "uid": "b3_population7_management_neprofile_role",
        "name": "Population7 Management",
        "groups": [
            "Population7 Management"
        ]
    },
    {
        "id": "ebc41f97-c78b-4dfb-a424-66beb9edcded",
        "uid": "ebc41f97c78b4dfba42466beb9edcded",
        "name": "Managed Services Collaborators",
        "groups": [
            "Managed Services Collaborators"
        ]
    },
    {
        "id": "ee4f91bd-fa5f-4ab0-969c-29f9a46be603",
        "uid": "ee4f91bdfa5f4ab0969c29f9a46be603",
        "name": "Alpha Inc Collaborators",
        "groups": [
            "Alpha Inc Collaborators"
        ]
    },
    {
        "id": "f911d6b8-de3c-4112-8dc3-0d9eb0b4659a",
        "uid": "b3_population_admins_neprofile_role",
        "name": "Population Admins",
        "groups": [
            "Population Admins",
            "ORG_ADMIN"
        ]
    },
    {
        "id": "ff7df780-b491-4482-9775-ca71df6dadfa",
        "uid": "b3_read_only_neprofile_role",
        "name": "Read Only",
        "groups": [
            "Read Only"
        ]
    },
    {
        "id": "ff8eea3c-6f71-4256-a84b-57aaacc87f3c",
        "uid": "ff8eea3c6f714256a84b57aaacc87f3c",
        "name": "Gamma LTD Collaborators",
        "groups": [
            "Gamma LTD Collaborators"
        ]
    }
]

function generateDummyUsers(count: number): User[] {
    let i = 0;
    return Array(count)
        .fill(null)
        .map(() => {
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            const email = `${firstName}.${lastName}@example.com`.toLowerCase()
            return {
                id: ++i + '',
                uid: ++i + '',
                name: `${firstName} ${lastName}`,
                login: `${firstName}.${lastName}`,
                status,
                email,
                group_strings: "",
                "type": "NeprofileUser"
            };
        });
}

const getRandomUserRolePairs = (roles: Role[], userRoleCount: number, userId: string): UserRolePair[] => {
    const count = Math.min(userRoleCount, roles.length);

    return [...roles]
        .sort(() => Math.random() - 0.5)
        .slice(0, count)
        .map(role => ({
            uid: role.uid, // not used anyway
            id: crypto.randomUUID(),
            user_id: userId,
            role_id: role.id
        }));
};

export class MockupClient implements Client {

    private readonly userCount = 35
    private readonly userRoleCount = 10
    users: User[];
    /**
     *
     */
    constructor() {
        this.users = generateDummyUsers(this.userCount);
    }

    async getTableVisibilityState(tableName: string): Promise<Record<string, boolean> | undefined> {
        return undefined;
    }

    async setTableVisibilityState(tableName: string, visibilityState: VisibilityState): Promise<void> {
        //Do Nothing
    }

    async updateUser(user: User): Promise<User> {
        await stall()
        const userIndex = this.users.findIndex(u => u.id === user.id);

        if (userIndex !== -1) {
            this.users[userIndex] = user;
        }

        return user;
    }

    async addUserRolePairings(args: NewUserRolePair[]): Promise<UserRolePair[]> {
        await stall()
        return args.map(x => ({
            ...x,
            id: crypto.randomUUID(),
            uid: crypto.randomUUID()
        }))

    }
    async removeUserRolePairing(id: string): Promise<void> {
        await stall()
        // do nothing
    }
    async deleteUser(idToRemove: string): Promise<void> {
        await stall()
        this.users = this.users.filter(user => user.id !== idToRemove);
    }

    async getUserRolePairings({ user_id, role_id }: { user_id?: string, role_id?: string }): Promise<UserRolePair[]> {
        await stall()
        if (user_id) {

            return getRandomUserRolePairs(roles, this.userRoleCount, user_id);
        }
        return []
    }
    async getRoles(): Promise<Role[]> {
        await stall()
        return roles;
    }

    async getUsers(): Promise<User[]> {
        await stall()
        return this.users
    }

}