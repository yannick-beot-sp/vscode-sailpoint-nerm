import type { ColumnFiltersState, PaginationState, SortingState, VisibilityState } from "@tanstack/table-core"
import type { Attribute } from "src/model/Attribute"
import type { NewUserRolePair } from "src/model/NewUserRolePair"
import type { Profile } from "src/model/Profile"
import type { Role } from "src/model/Role"
import type { User } from "src/model/User"
import type { UserRolePair } from "src/model/UserRolePair"



export interface Client {
    updateUser(user: User): Promise<User>
    getUsers(forceRefresh?: boolean): Promise<User[]>
    getRoles(forceRefresh?: boolean): Promise<Role[]>
    getUserRolePairings(args: { user_id?: string, role_id?: string }): Promise<UserRolePair[]>
    addUserRolePairings(args: NewUserRolePair[]): Promise<UserRolePair[]>
    removeUserRolePairing(id: string): Promise<void>
    deleteUser(id: string): Promise<void>

    /**
     * VisibilityState - which gives the visible column - is stored permanently by "tenant/table"
     * @param tableName 
     */
    getTableVisibilityState(tableName: string): Promise<Record<string, boolean> | undefined>;
    setTableVisibilityState(tableName: string, state: VisibilityState): Promise<void>;

    /**
     * PaginationState, SortingState & data are specific to a view and are not persisted
     */
    setPaginationState(state: PaginationState): void;
    getPaginationState(): PaginationState | undefined;
    
    setSortingState(state: SortingState): void;
    getSortingState(): SortingState | undefined;

    setGlobalFilter(filter: string): void;
    getGlobalFilter(): string | undefined;

    setColumnFiltersState(tableName: string, filter: ColumnFiltersState): Promise<void>;
    getColumnFiltersState(tableName: string):  Promise<ColumnFiltersState | undefined> ;

    setData<T>(data: T[]): void;
    getData<T>(): T[] | undefined;

    getProfiles(profileTypeId: string, forceRefresh?: boolean): Promise<Profile[]>
    deleteProfile(profileId: string): Promise<void>
    updateProfile(profile: Profile): Promise<Profile>

    getAttributes(forceRefresh?: boolean): Promise<Attribute[]>

    open(uri: string): Promise<void>

}