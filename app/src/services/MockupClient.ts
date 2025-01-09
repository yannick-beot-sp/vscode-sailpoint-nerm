import type { Status, User } from "src/model/User";
import type { Client, Users } from "./Client";

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

export class MockupClient implements Client {

    private readonly count = 35
    users: User[];
    /**
     *
     */
    constructor() {
        this.users = generateDummyUsers(this.count);
    }
    
    async getUsers(): Promise<User[]> {
        stall()
        return this.users
    }

}