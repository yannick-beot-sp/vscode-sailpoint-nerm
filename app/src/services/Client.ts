import type { VisibilityState } from "@tanstack/table-core"
import type { NewUserRolePair } from "src/model/NewUserRolePair"
import type { Role } from "src/model/Role"
import type { User } from "src/model/User"
import type { UserRolePair } from "src/model/UserRolePair"



export interface Client {
    updateUser(user:User): Promise<User>
    getUsers(): Promise<User[]>
    getRoles(): Promise<Role[]>
    getUserRolePairings(args:{ user_id?:string, role_id?:string}): Promise<UserRolePair[]>
    addUserRolePairings(args:NewUserRolePair[]): Promise<UserRolePair[]>
    removeUserRolePairing(id:string): Promise<void>
    deleteUser(id:string): Promise<void>
    getTableVisibilityState(tableName:string): Promise<Record<string, boolean>|undefined>;
    setTableVisibilityState(tableName:string, state:VisibilityState): Promise<void>;
}