import { Profile } from "../models/API";
import { NERMClient } from "../services/NERMClient";
import { paginator } from "../services/paginator";
import { IRequest, IRequestHandler } from "./interfaces";

export interface GetAllProfiles extends IRequest<Profile[]>, GetProfilesRequest { }

export interface GetProfilesRequest {
    forceRefresh?: boolean
    profileTypeId: string
}

const profileCache = new Map<string, Map<string, Profile[]>>()

export class GetAllProfilesQuery implements IRequestHandler<GetAllProfiles, Profile[]> {
    public readonly command = "getAllProfiles"

    constructor(private tenantId: string, private client: NERMClient) { }

    async handle(request: GetAllProfiles): Promise<Profile[]> {
        if (!request?.forceRefresh && profileCache.has(this.tenantId) && profileCache.get(this.tenantId)?.has(request.profileTypeId)) {
            return profileCache.get(this.tenantId)?.get(request.profileTypeId)!
        }

        const profiles = await paginator(this.client, this.client.getProfiles, { profile_type_id: request.profileTypeId })

        if (profileCache.has(this.tenantId)) {
            profileCache.get(this.tenantId)?.set(request.profileTypeId, profiles)
        } else {
            const innerMap = new Map<string, Profile[]>([
                [request.profileTypeId, profiles]
            ]);

            profileCache.set(this.tenantId, innerMap);
        }
        return profiles
    }
}