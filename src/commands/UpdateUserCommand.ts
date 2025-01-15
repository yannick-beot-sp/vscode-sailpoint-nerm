import { User } from "../models/API";
import { NERMClient } from "../services/NERMClient";
import { IRequest, IRequestHandler } from "./interfaces";

export interface UpdateUserRequest extends IRequest<User>, User { }

export class UpdateUserCommand implements IRequestHandler<UpdateUserRequest, User> {
    public readonly command = "updateUser"

    constructor(private client: NERMClient) { }

    async handle(request: UpdateUserRequest): Promise<User> {
        return await this.client.updateUser({
            user: request
        })
    }
}