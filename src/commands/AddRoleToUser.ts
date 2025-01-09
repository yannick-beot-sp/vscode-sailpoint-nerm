import { AddUserRoleDto, UserRole } from "../models/API";
import { NERMClient } from "../services/NERMClient";
import { IRequest, IRequestHandler } from "./interfaces";

export interface AddUserRoleQuery extends IRequest<UserRole>, AddUserRoleDto { }

export class AddRoleToUser implements IRequestHandler<AddUserRoleQuery, UserRole> {
    public readonly command = "addRoleToUser"

    constructor(private client: NERMClient) { }

    async handle(request: AddUserRoleQuery): Promise<UserRole> {

        return await this.client.addUserRolePairings({
            user_role: request
        })

    }
}