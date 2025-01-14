import { AddUserRolePairingsRequest, UserRole } from "../models/API";
import { NERMClient } from "../services/NERMClient";
import { IRequest, IRequestHandler } from "./interfaces";

export interface AddUserRoleQuery extends IRequest<UserRole[]>, AddUserRolePairingsRequest { }

export class AddUserRolePairingsCommand implements IRequestHandler<AddUserRoleQuery, UserRole[]> {
    public readonly command = "addUserRolePairings"

    constructor(private client: NERMClient) { }

    async handle(request: AddUserRoleQuery): Promise<UserRole[]> {

        return await this.client.addUserRolePairings(request)

    }
}