import * as bodyParser from 'body-parser';
import * as  express from 'express';
import { middeleWare2 } from './libs /routes/errorHandler';
import { middleWare1 } from './libs /routes/notFoundRoute';

const app = express();

export default class Server {
    constructor(private config) {
        this.setupRoutes();
        this.run();
        this.bootstrap();
        this.initBodyParser();

    }
    public setupRoutes() {
        app.use('/health-check' , ( req, res ) => {
        res.send('I am ok');
        });
        app.use(middleWare1);
        app.use('/api', middeleWare2);
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
