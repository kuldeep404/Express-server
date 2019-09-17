import * as supertest from 'supertest';
import { config } from '../config';
import { Server } from '../server';
const server = new Server(config);
const request = supertest(server.application());
describe('MAIN DESCRIBE', () => {
    beforeAll((done) => {
        server.bootstrap();
        done();
    });
    test('Database and Server Connection', async (done) => {
        const result = await request.get('/health-check');
        console.log('In health check', result.text);
        expect(result.statusCode).toBe(200);
        done();

    });
});
