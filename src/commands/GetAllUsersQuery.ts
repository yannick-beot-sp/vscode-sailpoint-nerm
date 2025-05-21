import { User, UserType } from "../models/API";
import { NERMClient } from "../services/NERMClient";
import { paginator } from "../services/paginator";
import { IRequest, IRequestHandler } from "./interfaces";

export interface GetAllUsersRequest extends IRequest<User[]> {
    forceRefresh?: boolean
}

const userCache = new Map<string, User[]>()


export class GetAllUsersQuery implements IRequestHandler<GetAllUsersRequest, User[]> {
    public readonly command = "getUsers"
    constructor(private tenantId: string, private client: NERMClient) {
    }

    async handle(request: GetAllUsersRequest): Promise<User[]> {
        if (!request?.forceRefresh && userCache.has(this.tenantId)) {
            return userCache.get(this.tenantId)!
        }

        let users = await paginator(this.client, this.client.getUsers, {})
        // Excluding DelegateUser
        users = users.filter(x => x.type === UserType.NeprofileUser || x.type === UserType.NeaccessUser)
        userCache.set(this.tenantId, users)
        return users
    }
}