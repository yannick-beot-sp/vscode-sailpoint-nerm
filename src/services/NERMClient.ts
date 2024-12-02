import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class NERMClient {
    constructor(private readonly axios: AxiosInstance) {

    }

    public async testConnection() {

        const response = await this.axios.get("users?limit=1", {
            // Don't throw when the status code is 401
            validateStatus: status => (status >= 200 && status < 300) || status === 401
        })

        if (response.status===401) {
            throw new Error("Invalid API Key");
        }
    }
}