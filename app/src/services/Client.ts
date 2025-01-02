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

export interface Users extends PaginatedData {
    users: User[]
}

export interface Client {
    getUsers(): Promise<Users>
}