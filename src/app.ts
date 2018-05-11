import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as expressSession from 'express-session';
import * as createError from 'http-errors';
import * as logger from 'morgan';
import * as path from 'path';

import * as indexRouter from './routes/index.js';
import * as messagesRouter from './routes/messages.js';
import * as usersRouter from './routes/users.js';

import * as config from './config.js';
import * as connectDb from './db/connect.js';


class App {

    public express: express.Application;

    constructor() {
        this.express = express();
        connectDb(config.mongoUrl);
        this.middleware();
        this.routes();
        this.handlers();
    }

    private middleware(): void {
        this.express.use(logger('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(cookieParser());
        this.express.use(expressSession({secret: config.secret}));
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
        this.express.use('/api/', indexRouter);
        this.express.use('/api/users', usersRouter);
        this.express.use('/api/messages', messagesRouter);
    }
}

export default new App().express;
