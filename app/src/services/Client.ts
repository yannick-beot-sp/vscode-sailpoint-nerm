import type { NewUserRolePair } from "src/model/NewUserRolePair"
import type { Role } from "src/model/Role"
import type { User } from "src/model/User"
import type { UserRolePair } from "src/model/UserRolePair"



export interface Client {
    getUsers(): Promise<User[]>
    getRoles(): Promise<Role[]>
    getUserRolePairings(args:{ user_id?:string, role_id?:string}): Promise<UserRolePair[]>
    addUserRolePairings(args:NewUserRolePair[]): Promise<UserRolePair[]>
    removeUserRolePairing(id:string): Promise<void>

}