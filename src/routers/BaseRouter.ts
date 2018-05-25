import { Router, Request, Response, NextFunction } from 'express';

import { Route, HttpMethod } from '../routes';

export default class BaseRouter {
    public readonly router: Router;
    private routes: Route[];
    private static instance: BaseRouter;

    protected constructor() {
        this.router = Router();
    }

    public static getInstance(): BaseRouter
    {
        return this.instance || (this.instance = new this());
    }

    protected pushRoute(route: Route) {
        this.routes.push(route);
        if(this.router[HttpMethod.GET]) {
            this.router[HttpMethod.GET](route.url, route.handler);
        }
    }
}
