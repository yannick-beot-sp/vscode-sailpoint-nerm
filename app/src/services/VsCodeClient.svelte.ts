import type { User } from "src/model/User";
import type { Client } from "./Client";
import { messageHandler } from "./MessageHandler";
import { Messenger } from "./Messenger";
import type { Role } from "src/model/Role";
import type { UserRolePair } from "src/model/UserRolePair";
import type { NewUserRolePair } from "src/model/NewUserRolePair";
import type { VisibilityState } from "@tanstack/table-core";


interface State {
    users?: User[]
}

export class VsCodeClient implements Client {

    async addUserRolePairings(args: NewUserRolePair[]): Promise<UserRolePair[]> {
        return await messageHandler.request<UserRolePair[]>("addUserRolePairings", {
            user_roles: args
        })
    }
    async removeUserRolePairing(id: string): Promise<void> {
        await messageHandler.request<UserRolePair[]>("removeRoleFromUser", { id })
    }
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

    async updateUser(user: User): Promise<User> {
        return await messageHandler.request<User>("updateUser", user)
    }

    async deleteUser(id: string): Promise<void> {
        await messageHandler.request<User>("deleteUser", { id })
    }

    async getTableVisibilityState(tableName: string): Promise<Record<string, boolean> | undefined> {
        return await messageHandler.request<Record<string, boolean> | undefined>("getTableVisibilityState", { tableName })
    }
    async setTableVisibilityState(tableName: string, visibilityState: VisibilityState): Promise<void> {
        await messageHandler.request<void>("setTableVisibilityState", {
            tableName,
            visibilityState: $state.snapshot(visibilityState)
        })
    }
}