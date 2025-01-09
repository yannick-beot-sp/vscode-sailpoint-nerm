import { GetUserRolePairingsRequest, User, UserRole } from "../models/API";
import { NERMClient } from "../services/NERMClient";
import { paginator } from "../services/paginator";
import { IRequest, IRequestHandler } from "./interfaces";

export interface GetAllUsers extends IRequest<UserRole[]> { }

export class GetAllUserRolePairings implements IRequestHandler<GetUserRolePairingsRequest, UserRole[]> {
    public readonly command = "getAllUserRolePairings"
    constructor(private client: NERMClient) {
    }

    async handle(request: GetUserRolePairingsRequest): Promise<UserRole[]> {
        const users = await paginator(this.client, this.client.getUserRolePairings, request)
        return users
    }
}