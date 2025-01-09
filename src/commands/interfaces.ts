export interface IRequest<Tout> { }

export interface IRequestHandler<Tin extends IRequest<Tout>, Tout> {
    command:string;
    handle(request: Tin): Promise<Tout>
}