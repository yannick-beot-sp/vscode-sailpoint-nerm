import type { User } from "src/model/User";
import type { Client } from "./Client";
import { messageHandler } from "./MessageHandler";
import { Messenger } from "./Messenger";
import type { Role } from "src/model/Role";
import type { UserRolePair } from "src/model/UserRolePair";
import type { NewUserRolePair } from "src/model/NewUserRolePair";
import type { PaginationState, SortingState, VisibilityState } from "@tanstack/table-core";


interface State {
    data?: any[]
    paginationState?: PaginationState
    sortingState?: SortingState
    globalFilter?: string
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

    async getRoles(forceRefresh?: boolean): Promise<Role[]> {
        return await messageHandler.request<Role[]>("getAllRoles", { forceRefresh })
    }

    private state: State = {}

    async getUsers(forceRefresh?: boolean): Promise<User[]> {
        return await messageHandler.request<User[]>("getUsers", { forceRefresh })
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

    setPaginationState(paginationState: PaginationState): void {
        const tmpstate = Messenger.getState() as State
        const newstate: State = {
            ...tmpstate,
            paginationState
        }
        Messenger.setState(newstate)
    }

    getPaginationState(): PaginationState | undefined {
        const tmpstate = Messenger.getState() as State
        return tmpstate?.paginationState
    }

    setSortingState(sortingState: SortingState): void {
        const tmpstate = Messenger.getState() as State
        const newstate: State = {
            ...tmpstate,
            sortingState
        }
        Messenger.setState(newstate)
    }

    getSortingState(): SortingState | undefined {
        const tmpstate = Messenger.getState() as State
        return tmpstate?.sortingState
    }

    setData<T>(data: T[]): void {
        const tmpstate = Messenger.getState() as State
        const newstate: State = {
            ...tmpstate,
            data
        }
        Messenger.setState(newstate)
    }

    getData<T>(): T[] | undefined {
        const tmpstate = Messenger.getState() as State
        return tmpstate?.data
    }

    setGlobalFilter(globalFilter: string): void {
        const tmpstate = Messenger.getState() as State
        const newstate: State = {
            ...tmpstate,
            globalFilter
        }
        Messenger.setState(newstate)
    }

    getGlobalFilter(): string | undefined {
        const tmpstate = Messenger.getState() as State
        return tmpstate?.globalFilter
    }
}