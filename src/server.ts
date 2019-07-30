import * as bodyParser from 'body-parser';
import * as  express from 'express';
import { errorHandlerMiddleware } from './libs/routes/errorHandler';
import { notFoundRouteMiddleware } from './libs/routes/notFoundRoute';
import router from './router';

const app = express();

export default class Server {
    constructor(private config) {
        this.run();
    }
    public setupRoutes() {
        app.use('/health-check' , ( req, res ) => {
            res.send('I am ok');
        });
        // app.use(notFoundRouteMiddleware);
        // app.use(errorHandlerMiddleware);
        app.use('/api', router);
    }
    public bootstrap() {
        this.setupRoutes();
        this.initBodyParser();
    }
    public initBodyParser() {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
    }
    public run() {
        const{
            config: { port },
        } = this;
        app.listen(port);
    }
}
