import * as _ from 'lodash';
import {NextFunction, Request, RequestHandler, Response} from 'express';

import {
    checkSession,
} from '../model/users';

import BaseRouteDecorator from './BaseRouteDecorator';
import Route from './Route';


export interface ErrorResolver {
    code: string;
    status: number;
    message: string;
}

export class ErrorResolver implements ErrorResolver {
    constructor(code: string, status: number, message: string) {
        this.code = code;
        this.status = status;
        this.message = message;
    }
}

export default class ErrorResolveDecorator extends BaseRouteDecorator {
    protected resolvers: ErrorResolver[];

    constructor(route: Route, errorResolvers: ErrorResolver[]) {
        super(route);

        this.resolvers = errorResolvers;
    }

    public async handler(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            await this.route.handler(req, res, next);
        } catch (err) {
            const resolver = _.find(this.resolvers, ['code', err.message]);
            resolver
                ? res.status(resolver.status).send(resolver.message)
                : res.status(400).send();
        }
    }
}