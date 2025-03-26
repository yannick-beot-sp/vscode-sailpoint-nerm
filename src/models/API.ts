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
    /** The ID of a user for filtering  */
    user_id?: string;

    /** The ID of a role for filtering */
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
    /** ID of the object to retrieve, update, or delete */
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

    /** This is the name of the profile type.  */
    name: string;
    category: 'employee' | 'non-employee' | 'organization' | 'assignment' | 'other'; // This is the category the profile type falls into.
    bypass_dup_protection: boolean; // Whether or not duplication protection is bypassed.
    archived: boolean; // Whether or not the profile type is archived.
    permitted_role_ids: string[]; // The role IDs that are permitted for this profile type.
    isc_synced: boolean; // Is this profile type synced with ICS.
    profile_type_dup_attributes: {
        id: string; // The ID of the properties that are used for duplication protection.
        uid: string; // The user-specified identifier of the properties that are used for duplication protection.
        profile_type_id: string; // The ID of the profile type.
        ne_attribute_id: string; // The ID of the NE attribute.
    }[];
    profile_type_namings: {
        id: string; // The ID of the profile type naming.
        uid: string; // The user-specified identifier of the profile type naming.
        profile_type_id: string; // The ID of the associated profile type.
        ne_attribute_id: string; // The ID of the associated NE attribute.
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
     * The id of the attribute
     */
    id: string
    /**
     * The user-specified identifier of the attribute
     */
    uid: string
    /**
     * The label for the attribute
     */
    label: string
    /**
     * A description of the attribute
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
     * The format of the date input if it is a date input
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
     * The status of the profiles that can be selected
     */
    selectable_status?: string | null
    /**
     * Type of risk that applies to the attribute
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
     * The ID of the filtering attribute
     */
    filtering_ne_attribute_id?: string | null

    legacy_id?: string | null

    risk_score_setting: string
    /**
     * The ID of the attribute filter
     */
    ne_attribute_filter_id?: string | null
    reverse_association_attribute?: {
        /**
         * The id of the attribute
         */
        id?: string
        /**
         * The user-specified identifier of the attribute
         */
        uid?: string
        /**
         * The label for the attribute
         */
        label?: string
        /**
         * A description of the attribute
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
         * The format of the date input if it is a date input
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
         * The status of the profiles that can be selected
         */
        selectable_status: string
        /**
         * What setting is used for the risk score
         */
        risk_score_setting: string
        /**
         * Type of risk that applies to the attribute
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
         * The ID of the filtering attribute
         */
        filtering_ne_attribute_id: string | null
        /**
         * The ID of the attribute filter
         */
        ne_attribute_filter_id: string | null
        /**
         * The ID of the attribute used with reverse association
         */
        reverse_association_attribute_id: string | null
        /**
         * The ID of the profile type the attribute applies to
         */
        profile_type_id?: string
        /**
         * The legacy ID
         */
        legacy_id: string | null
        /**
         * the temp of when attribute was created
         */
        tmp_created_at?: string
        /**
         * the temp of when attribute was last updated
         */
        tmp_updated_at?: string

        core: boolean
    } | null
    /**
     * The ID of the profile type the attribute applies to
     */
    profile_type_id: string | null
    /**
     * The type of data that applies to the attribute
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
     * This is the name of the profile.
     */
    name?: string
    /**
     * This is the ID of the profile type the profile belongs to
     */
    profile_type_id?: string
    /**
     * This is the status of the profile
     */
    status?: ProfileStatusValue
    /**
     * This is the ID proofing staus of the profile
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
    /** ID of the object to retrieve, update, or delete */
    id: string
}