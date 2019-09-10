import * as bodyParser from 'body-parser';
import * as  express from 'express';
import * as swaggerUi from 'swagger-ui-express';
import Database from './libs/Database';
import { errorHandlerMiddleware } from './libs/routes/errorHandler';
import { notFoundRouteMiddleware } from './libs/routes/notFoundRoute';
import router from './router';
import * as swaggerDocument from './swagger.json';
const app = express();
export default class Server {
    constructor(private config) {
        this.run();
    }
    public setupRoutes() {
        app.use('/health-check' , ( req, res ) => {
            res.send('I am ok');
        });
        app.use('/api', router);
        app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.use(notFoundRouteMiddleware);
        app.use(errorHandlerMiddleware);
    }
    public bootstrap() {
        this.initBodyParser();
        this.setupRoutes();
    }
    public initBodyParser() {
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
    }
    public run() {
        const{
            config: { port, mongoUri },
        } = this;
        Database.open(mongoUri);
        app.listen(port);
    }
}
