export const Status = {
    Active: "Active",
    Disabled: "Disabled"
};

export type StatusValue = typeof Status[keyof typeof Status];

export const UserType = {
    NeprofileUser: "NeprofileUser",
    NeaccessUser: "NeaccessUser"
};

export type UserTypeValue = typeof UserType[keyof typeof UserType];

export type User = {
    id: string;
    uid: string;
    name: string;
    email: string;
    type: UserTypeValue;
    title?: string;
    status: StatusValue;
    login: string;
    last_login?: Date;
    cookies_accepted_at?: Date;
    preferred_language?: string;
    locale?: string;
    group_strings: string;
};