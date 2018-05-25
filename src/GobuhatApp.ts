import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as expressSession from 'express-session';
import * as createError from 'http-errors';
import * as logger from 'morgan';
import * as path from 'path';

import App from './GobuhatApp.js';

import IndexRouter from './routers/IndexRouter';
import MessagesRouter from './routers/MessagesRouter';
import * as usersRouter from './routes/users.js';

import Config from './Config';
import * as connectDb from './db/connect.js';


export default class GobuhatApp implements App {

    public express: express.Application;

    constructor() {
        this.express = express();
        connectDb(Config.mongoUrl);
        this.middleware();
        this.routes();
        this.handlers();
    }

    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(cookieParser());
        this.express.use(expressSession({secret: Config.secret}));
    }

    private handlers(): void {
        this.express.use((req, res, next) => {
            next(createError(404));
        });

        this.express.use((err, req, res, next) => {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            res.status(err.status || 500);
        });
    }

    private routes(): void {
        this.express.use('/api/', IndexRouter.getInstance().router);
        this.express.use('/api/users', new UsersRouter().router);
        this.express.use('/api/messages', MessagesRouter.getInstance().router);
    }
}
