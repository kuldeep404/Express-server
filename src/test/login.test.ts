import { MongoMemoryServer } from 'mongodb-memory-server';
import * as supertest from 'supertest';
import { config } from '../config';
import Database from '../libs/Database';
import { Server } from '../server';

const mongod = new MongoMemoryServer();
const server = new Server(config);
const request = supertest(server.application());
describe('Login', () => {
    beforeAll(async (done) => {
        server.bootstrap();
        const uri = await mongod.getConnectionString();
        await Database.open(uri);
        done();
    });
    test('Login successfully ', async () => {
        const result = await request
        .post('/api/user/login')
        .set('Accept', 'application/json')
        .send({
            email: 'kuldeep@successive.tech',
            password: 'Training@123',
        });
        // console.log('>>>>>>>>>>', result.body);
        expect(result.body.status).toEqual(200);
        expect(result.body.message).toMatch('Login successfully');

    });
    test('Invalid Email', async () => {
        const result = await request
        .post('/api/user/login')
        .set('Accept', 'application/json')
        .send({
            email: 'kuldeep@gmail.tech',
            password: 'Training@123',
        });
        // console.log(result.body);
        expect(result.body.status).toEqual(422);
        expect(result.body.message).toEqual(['email is not correct']);

    });
    test('Invalid Password', async () => {
        const result = await request
        .post('/api/user/login')
        .set('Accept', 'application/json')
        .send({
            email: 'kuldeep@successive.tech',
            password: 'Training@1',
        });
        // console.log(result.body);
        expect(result.body).toHaveProperty('error');
        expect(result.body.status).toEqual(401);
        expect(result.body.message).toMatch('passwored incorrrect');

    });
    test('Invalid Creaditial ', async () => {
        const result = await request
        .post('/api/user/login')
        .set('Accept', 'application/json')
        .send({
            email: '',
            password: '',
        });
        expect(result.body.status).toEqual(422);
        expect(result.body.message).toEqual( ['email cannot be empty', 'password cannot be empty'] );

    });
    test('Invalid Creaditial ', async () => {
        const result = await request
        .post('/api/user/login')
        .set('Accept', 'application/json')
        .send({
            email: 'kuldee@successive.tech',
            password: 'Training@123',
        });
        // console.log(result.body);
        expect(result.body.error).toEqual('Invalid Credetial');
        expect(result.body.status).toEqual(401);
        expect(result.body.message).toEqual( ' Incorrect email' );

    });
    test('when email is not correct ', async () => {
        const result = await request
        .post('/api/user/login')
        .set('Accept', 'application/json')
        .send({
            email: 'kuldee',
            password: 'Trai',
        });
        console.log(result.body);
        expect(result.body.error).toEqual('Bad request ');
        expect(result.body.status).toEqual(422);
        expect(result.body.message).toEqual( ['email is not correct'] );

    });
});
