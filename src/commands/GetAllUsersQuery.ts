import { User } from "../models/API";
import { NERMClient } from "../services/NERMClient";
import { paginator } from "../services/paginator";
import { IRequest, IRequestHandler } from "./interfaces";

export interface GetAllUsers extends IRequest<User[]> { }

export class GetAllUsersQuery implements IRequestHandler<GetAllUsersQuery, User[]> {
    public readonly command = "getUsers"
    constructor(private client: NERMClient) {
    }

    async handle(request: GetAllUsers): Promise<User[]> {
        const users = await paginator(this.client, this.client.getUsers, request)
        return users
    }
}