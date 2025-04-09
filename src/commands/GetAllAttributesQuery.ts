import { Attribute, AttributeOption } from "../models/API";
import { NERMClient } from "../services/NERMClient";
import { paginator } from "../services/paginator";
import { IRequest, IRequestHandler } from "./interfaces";

export interface GetAllAttributes extends IRequest<AttributeWithOptions[]>, GetAttributesRequest { }

export interface GetAttributesRequest {
    forceRefresh?: boolean
}

interface AttributeWithOptions extends Attribute {
    options?: AttributeOption[]
}


const AttributeCache = new Map<string, AttributeWithOptions[]>()

export class GetAllAttributesQuery implements IRequestHandler<GetAllAttributes, AttributeWithOptions[]> {
    public readonly command = "getAllAttributes"

    constructor(private tenantId: string, private client: NERMClient) { }

    async handle(request: GetAllAttributes): Promise<AttributeWithOptions[]> {
        if (!request?.forceRefresh && AttributeCache.has(this.tenantId)) {
            return AttributeCache.get(this.tenantId)!
        }

        const attributes = await paginator(this.client, this.client.getAttributes, {})

        const attributeOptions = await paginator(this.client, this.client.getAttributeOptions, {})
        const optionsMap = new Map()
        attributeOptions.forEach((option) => {
            const key = option.ne_attribute_id;
            if (!optionsMap.has(key)) {
                optionsMap.set(key, []);
            }
            optionsMap.get(key)!.push(option);
        });

        const result = attributes.map((attribute): AttributeWithOptions => ({
            ...attribute,
            options: optionsMap.get(attribute.id),
        }));

        AttributeCache.set(this.tenantId, result)
        return result
    }
}