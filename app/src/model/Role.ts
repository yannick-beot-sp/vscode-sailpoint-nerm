export type Role = {
    id: string;
    uid: string;
    name: string;
    groups: string[];
    type?: "NeprofileRole" | "NeaccessRole"; // for creation
}