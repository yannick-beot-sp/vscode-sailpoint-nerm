import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetRolesRequest, GetRolesResponse, GetUserRolePairingsRequest, GetUserRolePairingsResponse, GetUsersRequest, GetUsersResponse, PaginatedData, Role, User, UserRole } from '../models/API';

export class NERMClient {
    constructor(private readonly axios: AxiosInstance) {

    }

    public async testConnection() {

        const response = await this.axios.get("users?limit=1", {
            // Don't throw when the status code is 401
            validateStatus: status => (status >= 200 && status < 300) || status === 401
        })

        if (response.status === 401) {
            throw new Error("Invalid API Key");
        }
    }

    public async getUsers(request: GetUsersRequest): Promise<PaginatedData<User>> {
        const response = await this.axios.get<GetUsersResponse>("users", { params: request })
        return {
            _metadata: response.data._metadata,
            data: response.data.users
        }
    }
    
    public async getRoles(request: GetRolesRequest): Promise<PaginatedData<Role>> {
        const response = await this.axios.get<GetRolesResponse>("roles", { params: request })
        return {
            _metadata: response.data._metadata,
            data: response.data.roles
        }
    }

    public async getUserRolePairings(request: GetUserRolePairingsRequest): Promise<PaginatedData<UserRole>> {
        const response = await this.axios.get<GetUserRolePairingsResponse>("user_roles", { params: request })
        return {
            _metadata: response.data._metadata,
            data: response.data.user_roles
        }
    }
}