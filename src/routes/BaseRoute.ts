import { RequestHandler,
    Request,
    Response,
    NextFunction } from 'express';

import Route, { HttpMethod } from './Route';


export default interface BaseRoute extends Route {
    errorHandler?(err, req: Request, res: Response,
                                           next: NextFunction): Promise<any>;
}
export default abstract class BaseRoute implements Route {
    public readonly method: HttpMethod;
    public readonly url: string;

    constructor (method: HttpMethod, url: string) {
        this.method = method;
        this.url = url;
    }

    public async handler(req: Request, res: Response, next: NextFunction) {
        try {
            await this.successHandler(req, res, next);
        } catch (err) {
            if(this.errorHandler) {
                await this.errorHandler(err, req, res, next);
            }
        }
    }

    public map(action: (route: Route) => Route): Route {
        return action(this);
    }

    protected abstract async successHandler(req: Request, res: Response,
                                            next: NextFunction): Promise<any>;
}
