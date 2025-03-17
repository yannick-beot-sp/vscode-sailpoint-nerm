import { Role } from "../models/API";
import { NERMClient } from "../services/NERMClient";
import { paginator } from "../services/paginator";
import { IRequest, IRequestHandler } from "./interfaces";

export interface GetAllRoles extends IRequest<Role[]>, GetRolesRequest { }

export interface GetRolesRequest {
    forceRefresh?: boolean
}

const roleCache = new Map<string, Role[]>()


export class GetAllRolesQuery implements IRequestHandler<GetAllRoles, Role[]> {
    public readonly command = "getAllRoles"

    constructor(private tenantId: string, private client: NERMClient) { }

    async handle(request: GetAllRoles): Promise<Role[]> {
        if (!request?.forceRefresh && roleCache.has(this.tenantId)) {
            return roleCache.get(this.tenantId)!
        }

        const roles = await paginator(this.client, this.client.getRoles, {})
        roleCache.set(this.tenantId, roles)
        return roles
    }
}