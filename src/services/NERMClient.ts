import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { GetUserRequest, GetUserResponse, PaginatedData, User } from '../models/API';

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

    public async getUsers(request: GetUserRequest): Promise<PaginatedData<User>> {
        const response = await this.axios.get<GetUserResponse>("users", { params: request })
        return {
            _metadata: response.data._metadata,
            data: response.data.users
        }
    }
}