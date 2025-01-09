export interface PaginationMetadata {
    "limit": number
    "offset": number
    "total": number
    "next"?: string
}
export interface PaginatedQueryParams {
    /**
     * Integer specifying the maximum number of records to return in a single API call. If it is not specified, a default limit is used.
     * @default 100
     */
    limit?: number
    /**
     * Integer specifying the offset of the first result from the beginning of the collection.
     * @default 0
     */
    offset?: number
    order?: string
    /**
     * Returns batching metadata in the response
     * @default false
     */
    metadata?: boolean
}

export interface PaginatedResponse {
    _metadata?: PaginationMetadata
}
export interface PaginatedData<T> extends PaginatedResponse {
    data: T[]
}

export type Status = "Active" | "Disabled"



export type User = {
    id: string;
    uid: string;
    name: string;
    email: string;
    type: "NeprofileUser" | "NeaccessUser";
    title?: string;
    status: Status;
    login: string;
    last_login?: Date;
    cookies_accepted_at?: Date;
    preferred_language?: string;
    locale?: string;
    group_strings: string;
};

export interface GetUsersRequest extends PaginatedQueryParams {
    /**
     *  object name for filtering
     */
    name?: string


    /**
     * The user login to search by
    */
    login?: string
    /**
     * The user title to search by
     */
    title?: string

    /*
     * status value for filtering
     */
    status?: Status

    /**
     * The user email to search by
     */
    email?: string

}

export interface GetUsersResponse extends PaginatedResponse {
    users: User[]
}

export interface GetRolesRequest extends PaginatedQueryParams {


}
export interface Role {
    /**
     * uuid
     */
    id: string;

    /**
     * Possible values: >= 32 characters and <= 32 characters
     * Example: sponsors_role
     */
    uid: string;

    /**
     * Example: Sponsors
     */
    name: string;

    groups: string[]
}

export interface GetRolesResponse extends PaginatedResponse {
    roles: Role[]
}

export interface UserRole {
    /**
    * uuid
    */
    id: string;

    /**
     * Possible values: >= 32 characters and <= 32 characters
     * Example: sponsors_role
     */
    uid: string;

    /** uuid  */
    user_id: string;

    /** uuid */
    role_id: string;
}

export interface GetUserRolePairingsRequest extends PaginatedQueryParams {
    /** The ID of a user for filtering  */
    user_id?: string;

    /** The ID of a role for filtering */
    role_id?: string;
}

export interface GetUserRolePairingsResponse extends PaginatedResponse {
    user_roles: UserRole[]
}
