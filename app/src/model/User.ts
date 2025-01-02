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