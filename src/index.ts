import { config } from './config';
import { Server } from './server';

console.log('configuration is', config);
const server = new Server(config);
server.bootstrap().run();
