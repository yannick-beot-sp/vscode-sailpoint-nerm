export interface IRequest<Tout> { }

export interface IRequestHandler<Tin extends IRequest<Tout>, Tout> {
    handle(request: Tin): Promise<Tout>
}