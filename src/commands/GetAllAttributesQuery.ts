import { Attribute } from "../models/API";
import { NERMClient } from "../services/NERMClient";
import { paginator } from "../services/paginator";
import { IRequest, IRequestHandler } from "./interfaces";

export interface GetAllAttributes extends IRequest<Attribute[]>, GetAttributesRequest { }

export interface GetAttributesRequest {
    forceRefresh?: boolean
}

const AttributeCache = new Map<string, Attribute[]>()

export class GetAllAttributesQuery implements IRequestHandler<GetAllAttributes, Attribute[]> {
    public readonly command = "getAllAttributes"

    constructor(private tenantId: string, private client: NERMClient) { }

    async handle(request: GetAllAttributes): Promise<Attribute[]> {
        if (!request?.forceRefresh && AttributeCache.has(this.tenantId)) {
            return AttributeCache.get(this.tenantId)!
        }

        const Attributes = await paginator(this.client, this.client.getAttributes, {})
        AttributeCache.set(this.tenantId, Attributes)
        return Attributes
    }
}