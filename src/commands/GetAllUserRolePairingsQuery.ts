import { GetUserRolePairingsRequest, UserRole } from "../models/API";
import { NERMClient } from "../services/NERMClient";
import { paginator } from "../services/paginator";
import { IRequest, IRequestHandler } from "./interfaces";

export interface GetUserRolePairings extends IRequest<UserRole[]>,GetUserRolePairingsRequest { }

export class GetAllUserRolePairingsQuery implements IRequestHandler<GetUserRolePairingsRequest, UserRole[]> {
    public readonly command = "getAllUserRolePairings"
    constructor(private client: NERMClient) {
    }

    async handle(request: GetUserRolePairings): Promise<UserRole[]> {
        const users = await paginator(this.client, this.client.getUserRolePairings, request)
        return users
    }
}