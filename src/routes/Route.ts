import { RequestHandler,
    Request,
    Response,
    NextFunction } from 'express';

import Mapable from '../utils/Mapable';


export enum HttpMethod {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete',
}

export default interface Route extends Mapable<Route> {
    readonly method: HttpMethod;
    readonly url: string;

    handler(req: Request, res: Response, next: NextFunction): Promise<any>;
}