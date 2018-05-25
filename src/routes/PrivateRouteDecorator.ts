import {
    Request,
    Response,
    NextFunction,
} from 'express';

import {
    checkSession,
} from '../model/users';

import Route from './Route';
import BaseRouteDecorator from './BaseRouteDecorator';


export interface PrivateRequest extends Request {
    login: string;
}

/* TODO
    export interface PrivateRoute extends Route {
       handler(req: PrivateRequest, res: Response, next: NextFunction): Promise<any>;
   }

export default class PrivateRouteDecorator extends BaseRouteDecorator implements PrivateRoute {
    constructor(route: PrivateRoute) {
        super(route);
    }
/**/

export default class PrivateRouteDecorator extends BaseRouteDecorator {
    public async handler(req: Request, res: Response, next: NextFunction): Promise<any> {
        const token: string = req.get('X-AUTH-TOKEN');
        const login: string = token && await checkSession(token);
        if (!login) {
            res.status(401).send('Not authorized');
            return;
        }
        (req as PrivateRequest).login = login;
        const privateReq: PrivateRequest = req as PrivateRequest;
        await this.route.handler(privateReq, res, next);
    }
}
