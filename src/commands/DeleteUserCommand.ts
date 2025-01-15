import { DeleteUserRequest, DeleteUserResponse } from "../models/API";
import { NERMClient } from "../services/NERMClient";
import { IRequest, IRequestHandler } from "./interfaces";

export interface DeleteUserHandlerRequest extends IRequest<DeleteUserResponse>, DeleteUserRequest { }

export class DeleteUserCommand implements IRequestHandler<DeleteUserHandlerRequest, DeleteUserResponse> {
    public readonly command = "deleteUser"

    constructor(private client: NERMClient) { }

    async handle(request: DeleteUserHandlerRequest): Promise<DeleteUserResponse> {
        return await this.client.deleteUser(request)
    }
}