import { Profile } from "../models/API";
import { NERMClient } from "../services/NERMClient";
import { IRequest, IRequestHandler } from "./interfaces";

export interface UpdateProfileRequest extends IRequest<Profile>, Profile { }

export class UpdateProfileCommand implements IRequestHandler<UpdateProfileRequest, Profile> {
    public readonly command = "updateProfile"

    constructor(private client: NERMClient) { }

    async handle(request: UpdateProfileRequest): Promise<Profile> {
        const response =  await this.client.updateProfile({
            profile: request
        })
        return response.profile
    }
}