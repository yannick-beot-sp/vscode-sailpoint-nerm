export interface PaginationMetadata {
    "limit": number
    "offset": number
    "total": number
    "next"?: string
}
export interface PaginatedQueryParams {
    /**
     * @default 100
     */
    limit?: number
    /**
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

export interface ErrorResponse {
    error: string
}

export const ErrorMessages = {
    NO_USER_ROLE: "no user roles found"
} as const;

export function isError(e: any): e is ErrorResponse {
    return "error" in e
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

export interface GetRolesRequest extends PaginatedQueryParams { }

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
    user_id?: string;

    role_id?: string;
}

export interface GetUserRolePairingsResponse extends PaginatedResponse {
    user_roles: UserRole[]
}

export interface AddUserRoleDto {
    /** uuid  */
    user_id: string;

    /** uuid */
    role_id: string;
}

export interface AddUserRolePairingsRequest {
    user_roles: AddUserRoleDto[]
}

export interface AddUserRolePairingsResponse {
    user_roles: UserRole[]
}

export interface RemoveUserRolePairingsRequest {
    id: string
}

export interface RemoveUserRolePairingsResponse {
}

export interface UpdateUserRequest {
    user: User
}

export interface UpdateUserResponse extends UpdateUserRequest {
}

export interface DeleteUserRequest {
    id: string
}

export interface DeleteUserResponse {
    /** A message confirming the operation */
    info: string
}


export interface GetProfileTypesRequest extends PaginatedQueryParams {
    /**
     *  object name for filtering
     */
    name?: string

    /**
     * Filter by archive status
     */
    archived?: boolean
}

export interface ProfileType {
    /**
    * uuid
    */
    id: string;

    /**
     * Possible values: >= 32 characters and <= 32 characters
     * Example: sponsors_role
     */
    uid: string;

    name: string;
    category: 'employee' | 'non-employee' | 'organization' | 'assignment' | 'other'; // This is the category the profile type falls into.
    bypass_dup_protection: boolean; // Whether or not duplication protection is bypassed.
    archived: boolean; // Whether or not the profile type is archived.
    permitted_role_ids: string[]; // The role IDs that are permitted for this profile type.
    isc_synced: boolean; // Is this profile type synced with ICS.
    profile_type_dup_attributes: {
    }[];
    profile_type_namings: {
        order: number; // The order that the namings are used in.
    }[];
}

export interface GetProfileTypesResponse extends PaginatedResponse {
    profile_types: ProfileType[]
}

export type DataType = "text field"
    | "text area"
    | "drop-down"
    | "radio buttons"
    | "check boxes"
    | "date"
    | "tags"
    | "attachment"
    | "profile select"
    | "profile search"
    | "owner select"
    | "owner search"
    | "contributor select"
    | "contributor search"


export interface GetAttributesRequest extends PaginatedQueryParams {
    /**
     *  The attribute label to filter by
     */
    label?: string

    data_type?: DataType
}

export interface Attribute {
    /**
     */
    id: string
    /**
     */
    uid: string
    /**
     * The label for the attribute
     */
    label: string
    /**
     */
    description: string | null
    /**
     * The helper text that accompanies the attribute
     */
    tool_tip: string | null
    /**
     * Whether the attribute is encrypted
     */
    crypt: boolean
    /**
     * Whether the attribute is archived
     */
    archived: boolean
    /**
     * When the attribute was archived
     */
    archived_on: Date | null
    /**
     * When the attribute was created
     */
    created_at: Date
    /**
     * When the attribute was updated
     */
    updated_at: Date
    /**
     */
    date_format?:
    | "mm/dd/yyyy"
    | "mm-dd-yyyy"
    | "dd/mm/yyyy"
    | "dd-mm-yyyy"
    | "yyyy/mm/dd"
    | "yyyy-mm-dd"
    | null
    /**
     */
    selectable_status?: string | null
    /**
     */
    risk_type: string
    /**
     * Only shows profiles that the user currently has access to, to be selected
     */
    ownership_driven: boolean
    /**
     * Whether or not multiple selections can be made on something like a contributor search.
     */
    allow_multiple_selections: boolean
    /**
     * Whether or not the attribute is filtered by another attribute
     */
    filtered_by_ne_attribute: boolean
    /**
     */
    filtering_ne_attribute_id?: string | null

    legacy_id?: string | null

    risk_score_setting: string
    /**
     */
    ne_attribute_filter_id?: string | null
    reverse_association_attribute?: {
        /**
         */
        id?: string
        /**
         */
        uid?: string
        /**
         * The label for the attribute
         */
        label?: string
        /**
         */
        description?: string | null
        /**
         * The helper text that accompanies the attribute
         */
        tool_tip?: string
        /**
         * Whether or not the attribute is encrypted
         */
        crypt?: boolean
        /**
         * Whether the attribute is archived
         */
        archived?: boolean
        /**
         * When the attribute was archived
         */
        archived_on?: Date | null
        /**
         * When the attribute was created
         */
        created_at: Date
        /**
         * When the attribute was last updated
         */
        updated_at: Date
        /**
         */
        date_format?:
        | "mm/dd/yyyy"
        | "mm-dd-yyyy"
        | "dd/mm/yyyy"
        | "dd-mm-yyyy"
        | "yyyy/mm/dd"
        | "yyyy-mm-dd"
        | null
        /**
         */
        selectable_status: string
        /**
         * What setting is used for the risk score
         */
        risk_score_setting: string
        /**
         */
        risk_type: string
        /**
         * Only shows profiles that the user currently has access to, to be selected
         */
        ownership_driven: boolean
        /**
         * Whether or not multiple selections can be made on something like a contributor search.
         */
        allow_multiple_selections: boolean
        /**
         * Whether or not the attribute is filtered by another attribute
         */
        filtered_by_ne_attribute: boolean
        /**
         */
        filtering_ne_attribute_id: string | null
        /**
         */
        ne_attribute_filter_id: string | null
        /**
         */
        reverse_association_attribute_id: string | null
        /**
         */
        profile_type_id?: string
        /**
         * The legacy ID
         */
        legacy_id: string | null
        /**
         */
        tmp_created_at?: string
        /**
         */
        tmp_updated_at?: string

        core: boolean
    } | null
    /**
     */
    profile_type_id: string | null
    /**
     */
    data_type: DataType
    /**
     * The attribute's type
     */
    type:
    "AttachmentAttribute"
    | "CheckBoxesAttribute"
    | "ContributorSearchAttribute"
    | "ContributorSelectAttribute"
    | "DateAttribute"
    | "DropDownAttribute"
    | "OwnerSearchAttribute"
    | "OwnerSelectAttribute"
    | "ProfileSearchAttribute"
    | "ProfileSelectAttribute"
    | "RadioButtonsAttribute"
    | "TagsAttribute"
    | "TextAreaAttribute"
    | "TextFieldAttribute"

}

export interface GetAttributesResponse extends PaginatedResponse {
    ne_attributes: Attribute[]
}

const ProfileStatus = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    ON_LEAVE: 'On Leave',
    TERMINATED: 'Terminated'
} as const;

type ProfileStatusValue = typeof ProfileStatus[keyof typeof ProfileStatus];

export interface GetProfilesRequest  extends PaginatedQueryParams {
    /**
    /**
     * Allows for optimization by not returning the associated attribute data for the returned profiles
     */
    exclude_attributes?: boolean
    /**
     * object name for filtering
     */
    name?: string
    /**
     * Profile Type ID for filtering
     */
    profile_type_id?: string
    /**
     * status value for filtering
     */
    status?: ProfileStatusValue
    
}


export interface Profile{
    /**
     * The objects ID
     */
    id?: string
    /**
     * The objects UID
     */
    uid?: string
    /**
     */
    name?: string
    /**
     */
    profile_type_id?: string
    /**
     */
    status?: ProfileStatusValue
    /**
     */
    id_proofing_status?: "pending" | "pass" | "fail"
    /**
     * The date and time the profile was created
     */
    created_at?: string
    /**
     * The date and time the profile was updated
     */
    updated_at?: string
    /**
     * Attributes that belong to this profile.
     */
    attributes?: {
      [k: string]: string
    }
  }
export interface GetProfilesResponse extends PaginatedResponse {
    profiles: Profile[]
}

export interface DeleteProfileRequest {
    id: string
}

export interface UpdateProfileRequest {
    profile: Profile
}

export interface UpdateProfileResponse {
    profile: Profile
}