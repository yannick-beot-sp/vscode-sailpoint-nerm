import type { Role } from "src/model/Role"
import type { User } from "src/model/User"



export interface PaginationMetadata {
    "limit": number
    "offset": number
    "total": number
    "next"?: string
}

export interface PaginatedData {
    _metadata?: PaginationMetadata
}

export interface Client {
    getUsers(): Promise<User[]>
    getRoles(): Promise<Role[]>
}