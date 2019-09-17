import * as supertest from 'supertest';
import Database from '../libs/Database';
import { config } from '../config';
import { Server } from '../server';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();
const server = new Server(config);
const request = supertest(server.application());
let token;
describe('To get user', () => {
    beforeAll(async (done) => {
        server.bootstrap();
        const uri = await mongod.getConnectionString();
        await Database.open(uri);
        const res = await request
            .post('/api/user/login')
            .set('Accept', 'application/json')
            .send({
                email: 'kuldeep@successive.tech',
                password: 'Training@123'
            });
        const { body: { status, data, message, error } } = res;
        token = data;
        done();
    });
    test('User get successfully', async () => {
        const res = await request
            .get('/api/user/me')
            .set('Accept', 'application/json')
            .set('authorization', token);
            // console.log("dnbjvsAJVFKd", token);
        expect(res.body.status).toEqual(200);
        expect(res.body.message).toEqual('user get successfully');
    });
    test(' get user with invalid token', async () => {
        const res = await request
            .get('/api/user/me')
            .set('Accept', 'application/json')
            .set('Authorization', 'invalidtoken');
        expect(res.body.status).toEqual(403);
        expect(res.body.message).toEqual('Token expired');
    });
});