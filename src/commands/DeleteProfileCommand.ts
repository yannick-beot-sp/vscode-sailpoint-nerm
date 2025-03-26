import { DeleteProfileRequest } from "../models/API";
import { NERMClient } from "../services/NERMClient";
import { IRequest, IRequestHandler } from "./interfaces";

export interface DeleteProfileHandlerRequest extends IRequest<void>, DeleteProfileRequest { }

export class DeleteProfileCommand implements IRequestHandler<DeleteProfileHandlerRequest, void> {
    public readonly command = "deleteProfile"

    constructor(private client: NERMClient) { }

    async handle(request: DeleteProfileHandlerRequest): Promise<void> {
        await this.client.deleteProfile(request)
    }
}