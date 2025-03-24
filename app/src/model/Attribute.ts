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
    description: string| null
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