import { RequestHandler,
    Request,
    Response,
    NextFunction } from 'express';

import Route, {HttpMethod} from './Route';


export default abstract class BaseRouteDecorator implements Route {
    protected route: Route;

    public get url(): string {
        return this.route.url;
    }

    public get method(): HttpMethod {
        return this.route.method;
    }

    constructor(route: Route) {
        this.route = route;
    }

    public abstract async handler(req: Request, res: Response, next: NextFunction): Promise<any>;

    public map(action: (route: Route) => Route): Route {
        return action(this);
    }
}

