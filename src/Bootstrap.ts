import App from './App';
import * as http from 'http';
import * as debug from 'debug';
import Config from './Config';

export default class Bootstrap {
    private app: App;
    private server: http.Server;
    private port: string | number | boolean = Config.port;

    constructor(app: App) {
        this.app = app;
    }

    public init(): void {

        const server = http.createServer(this.app.express);
        server.listen(this.port);
        server.on('error', this.onError);
        server.on('listening', this.onListening);
        console.log('listen on ', this.port);
    }

    private onError(error: NodeJS.ErrnoException): void {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = (typeof this.port === 'string')
            ? 'Pipe ' + this.port
            : 'Port ' + this.port;
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    private onListening(): void {
        const addr = this.server.address();
        const bind = (typeof addr === 'string') ?
            `pipe ${addr}` :
            `port ${addr.port}`;
        debug(`Listening on ${bind}`);
    }
}