import {
    Request,
    Response,
    NextFunction,
} from 'express';

import BaseRouter from './BaseRouter';

import {
    sendMessageToUser,
    sendMessage,
    getMessagesWithUser,
    getMessages,
} from '../model/messaging.js';

import * as errorCodes from '../model/error_codes';

import { BaseRoute, HttpMethod, PrivateRequest, PrivateRouteDecorator, ErrorResolveDecorator, ErrorResolver } from '../routes';


class SendMessageToUserRoute extends BaseRoute {
    protected async successHandler(req: PrivateRequest, res: Response, next: NextFunction) {
        const {
                content,
            } = req.body, {
                id: userId,
            } = req.params,
            author = req.login;

        await sendMessageToUser(userId, author, content);
        res.status(201).send();
    }
}

class SendMessageToThreadRoute extends BaseRoute {
    protected async successHandler(req: PrivateRequest, res: Response, next: NextFunction) {
        const {
                content
            } = req.body, {
                id: threadId
            } = req.params,
            author = req.login;

        await sendMessage(threadId, author, content);
        res.status(201).send();
    }
}

class GetMessagesByUserRoute extends BaseRoute {
    protected async successHandler(req: PrivateRequest, res: Response, next: NextFunction) {
        const {
            id: userId
        } = req.params;

        const messages = await getMessagesWithUser(userId, req.login);
        res.status(200).send(messages);
    }
}

class GetMessagesByThreadRoute extends BaseRoute {
    protected async successHandler(req: PrivateRequest, res: Response, next: NextFunction) {
        const {
            id: threadId
        } = req.params;

        const messages = await getMessages(threadId, req.login);
        res.status(200).send(messages);
    }
}


export default class MessagesRouter extends BaseRouter {
    private static sendMessageResolvers: ErrorResolver[] = [{
        code: errorCodes.USER_HAVE_NOT_ACCESS_TO_THREAD,
        status: 401,
        message: 'User can not send messages in this thread',
    }, {
        code: errorCodes.THREAD_DOES_NOT_EXIST,
        status: 404,
        message: 'This thread does not exist',
    }];

    private static getMessagesByUserResolvers: ErrorResolver[] = [{
        code: errorCodes.THREAD_DOES_NOT_EXIST,
        status: 404,
        message: 'Thread with this user does not exist',
    }];

    private static getMessagesByThreadResolvers: ErrorResolver[] = [{
        code: errorCodes.USER_HAVE_NOT_ACCESS_TO_THREAD,
        status: 401,
        message: 'User can not get messages of this thread',
    }, {
        code: errorCodes.THREAD_DOES_NOT_EXIST,
        status: 404,
        message: 'This thread does not exist',
    }];

    constructor() {
        super();

        [
            new SendMessageToUserRoute(HttpMethod.POST, '/user/:id/send')
                .map((route) => new PrivateRouteDecorator(route))
                .map(route => new ErrorResolveDecorator(route, MessagesRouter.sendMessageResolvers)),
            new SendMessageToThreadRoute(HttpMethod.POST, '/thread/:id/send/')
                .map(route => new PrivateRouteDecorator(route))
                .map(route => new ErrorResolveDecorator(route, MessagesRouter.sendMessageResolvers)),
            new GetMessagesByUserRoute(HttpMethod.GET, '/user/:id/')
                .map(route => new PrivateRouteDecorator(route))
                .map(route => new ErrorResolveDecorator(route, MessagesRouter.getMessagesByUserResolvers)),
            new GetMessagesByThreadRoute(HttpMethod.GET, '/thread/:id/')
                .map(route => new PrivateRouteDecorator(route))
                .map(route => new ErrorResolveDecorator(route, MessagesRouter.getMessagesByThreadResolvers))
        ]
            .forEach(route => (route));
    }
}
