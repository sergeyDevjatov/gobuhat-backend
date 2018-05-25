import { Router, Request, Response, NextFunction } from 'express';

import BaseRouter from './BaseRouter';
import { BaseRoute, HttpMethod } from '../routes';

class IndexRoute extends BaseRoute {
    public async successHandler(req: Request, res: Response,
                                next: NextFunction): Promise<any> {
        res.status(200).send({ title: 'Express' });
    }
}

export default class IndexRouter extends BaseRouter {

    protected constructor() {
        super();

        this.pushRoute(new IndexRoute(HttpMethod.GET, '/'));
    }
}

