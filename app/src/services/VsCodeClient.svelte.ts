import type { User } from "src/model/User";
import type { Client } from "./Client";
import { messageHandler } from "./MessageHandler";
import { Messenger } from "./Messenger";
import type { Role } from "src/model/Role";
import type { UserRolePair } from "src/model/UserRolePair";


interface State {
    users?: User[]
}

export class VsCodeClient implements Client {
    async getUserRolePairings(args: { user_id?: string; role_id?: string; }): Promise<UserRolePair[]> {
        return await messageHandler.request<UserRolePair[]>("getAllUserRolePairings", args)
    }
    async getRoles(): Promise<Role[]> {
        return await messageHandler.request<Role[]>("getAllRoles")
    }
    private state: State = {}

    async getUsers(): Promise<User[]> {
        return await messageHandler.request<User[]>("getUsers")
    }
}