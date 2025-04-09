export type Profile = {
    /**
     * Attributes that belong to this profile.
     */
    attributes?: { [key: string]: string };
    /**
     * The date and time the profile was created
     */
    created_at?: Date;
    /**
     * The objects ID
     */
    id: string;
    /**
     * This is the ID proofing staus of the profile
     */
    id_proofing_status?: IDProofingStatusValue;
    /**
     * This is the name of the profile.
     */
    name?: string;
    /**
     * This is the ID of the profile type the profile belongs to
     */
    profile_type_id?: string;
    /**
     * This is the status of the profile
     */
    status?: StatusValue;
    /**
     * The objects UID
     */
    uid?: string;
    /**
     * The date and time the profile was updated
     */
    updated_at?: Date;
}

/**
 * This is the ID proofing staus of the profile
 */
export const IDProofingStatus = {
    Fail: "fail",
    Pass: "pass",
    Pending: "pending",
}

export type IDProofingStatusValue = typeof IDProofingStatus[keyof typeof IDProofingStatus];

/**
 * This is the status of the profile
 */
export const Status = {
    Active: "Active",
    Inactive: "Inactive",
    "On Leave": "On Leave",
    Terminated: "Terminated",
}

export type StatusValue = typeof Status[keyof typeof Status];