import * as  express from 'express';

const app = express();

export default class Server {
    constructor(private config) {
        this.setupRoutes();
        this.run();
        this.bootstrap();

    }
    public setupRoutes() {
        // const {app}=this;
        app.get( '/health-check' , (req , res ) => {
            res.send('I am ok');
        });
    }
    public bootstrap() {
        this.setupRoutes();
    }
    public run() {
        const{
            config: { port },
        } = this;
        app.listen(9000);
    }
}
