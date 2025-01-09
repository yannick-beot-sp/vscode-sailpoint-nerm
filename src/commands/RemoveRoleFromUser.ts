import { RemoveUserRolePairingsRequest, RemoveUserRolePairingsResponse } from "../models/API";
import { NERMClient } from "../services/NERMClient";
import { IRequest, IRequestHandler } from "./interfaces";

export interface RemoveUserRolePairingsQuery extends IRequest<RemoveUserRolePairingsResponse>, RemoveUserRolePairingsRequest { }

export class RemoveRoleFromUser implements IRequestHandler<RemoveUserRolePairingsQuery, RemoveUserRolePairingsResponse> {
    public readonly command = "removeRoleFromUser"

    constructor(private client: NERMClient) { }

    async handle(request: RemoveUserRolePairingsQuery): Promise<RemoveUserRolePairingsResponse> {

        return await this.client.removeUserRolePairings(request)

    }
}