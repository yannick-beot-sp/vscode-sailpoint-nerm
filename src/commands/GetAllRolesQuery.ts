import { GetRolesRequest, Role } from "../models/API";
import { NERMClient } from "../services/NERMClient";
import { paginator } from "../services/paginator";
import { IRequest, IRequestHandler } from "./interfaces";

export interface GetAllRoles extends IRequest<Role[]>,GetRolesRequest { }

export class GetAllRolesQuery implements IRequestHandler<GetAllRoles, Role[]> {
    public readonly command = "getAllRoles"

    constructor(private client: NERMClient) {}

    async handle(request: GetAllRoles): Promise<Role[]> {
        const roles = await paginator(this.client, this.client.getRoles, request)
        return roles
    }
}