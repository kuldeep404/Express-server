import * as supertest from 'supertest';
import Database from '../libs/Database';
import { config } from '../config';
import { Server } from '../server';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();
const server = new Server(config);
const request = supertest(server.application());
let token;


describe('Fetch all trainee ', () => {
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
        token = res.body.data;
        // console.log(token);
        done();
    });
    beforeAll(async (done) => {
      const res = await request
        .post('/api/trainee')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send({
            email: 'ranjan@successive.tech',
            name: 'ranjan',
            password: 'ranjan@123' });
            // userId = res.body.data.originalId;
      done();
    });
    beforeAll(async (done) => {
      const res = await request
        .post('/api/trainee')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send({
            email: 'ram@successive.tech',
            name: 'ram',
            password: 'ram@123' });
            // userId = res.body.data.originalId;
      done();
    });
    test('fetch all trainee successfully', async (done) => {
        const res = await request
          .get('/api/trainee')
          .set('Authorization', token);
        // console.log('1.---------->', res.body);
        expect(res.body).toHaveProperty('data');
        expect(res.body.status).toEqual(200);
        done();
      });
      test('provide wrong token while fetching trainees', async (done) => {
        const res = await request
          .get('/api/trainee')
          .set('Authorization', `${token}89k9`);
        //   console.log('2.---------->', res.body);
        expect(res.body).toHaveProperty('error');
        expect(res.body.message).toEqual('Token expired');
        expect(res.body.status).toEqual(403);
        done();
      });
      test(' wrong limit ', async (done) => {
        const res = await request
          .get('/api/trainee/?limit=kuld')
          .set('Authorization', token);
        //   console.log('3.---------->', res.body);
        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toEqual('Bad request ');
        expect(res.body.message).toEqual(['limit value must be number']);
        expect(res.body.status).toEqual(422);
        done();
      });
    });