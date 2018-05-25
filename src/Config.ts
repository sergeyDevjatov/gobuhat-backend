export default class Config {
    private static defaultMongoUrl: string = 'mongodb://localhost:27017/test';
    private static defaultPort: string = '3000';
    private static defaultSecret: string = 'default_secret';

    public static get mongoUrl(): string {
        return process.env.MONGO_URL || this.defaultMongoUrl;
    }

    public static get port(): string | number | boolean {
        let origPort = process.env.PORT || this.defaultPort,
            port = Number.parseInt(origPort, 10);
        if(Number.isNaN(port)) {
            return origPort;
        } else if(port >= 0) {
            return port;
        }
        return false;
    }

    public static get secret(): string {
        return process.env.SECRET_KEY || this.defaultSecret;
    }
}
