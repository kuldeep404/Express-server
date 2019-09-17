import * as supertest from 'supertest';
import Database from '../libs/Database';
import { config } from '../config';
import { Server } from '../server';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();
const server = new Server(config);
const request = supertest(server.application());
let token;
// tslint:disable-next-line:prefer-const
let id;


describe('Update trainee', () => {
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
        id = res.body.data.originalId;
        done();
      });
    test(' update trainee successfully', async (done) => {
        const res = await request
          .put('/api/trainee')
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .send({
            dataToUpdate: {
              name: 'raghav' },
            id });
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('id');
        expect(res.body.data.id).toEqual(id);
        expect(res.status).toEqual(200);
        expect(res.body.message).toMatch('Trainee update  successfully');
        done();
      });
      test('update trainee with already existing email', async (done) => {
        const res = await request
          .put('/api/trainee')
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .send({
            dataToUpdate: {
              email: 'kuldeep@successive.tech' },
            id });
            // console.log('2------->', res.body);
        expect(res.body).toHaveProperty('error');
        expect(res.body.status).toEqual(404);
        expect(res.body.message).toMatch('email already exist');
        done();
      });
      test('update  without inputs', async (done) => {
        const res = await request
          .put('/api/trainee')
          .set('Accept', 'application/json')
          .set('Authorization', token);
        //   console.log('3------->', res.body);
        expect(res.body).toHaveProperty('error');
        expect(res.body.status).toEqual(422);
        expect(res.body.message).toEqual(['dataToUpdate is required', 'id is required']);
        // expect(res.body.message).toContain('id is required');
        done();
      });
      test('update trainee with wrong dataToUpdate', async (done) => {
        const res = await request
          .put('/api/trainee')
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .send({
            dataToUpdate: {
              email: 'test@gmail.com',
              name: 'test@!',
              password: '' },
            id: '12345' });
            console.log('5------->', res.body);
        expect(res.body).toHaveProperty('error');
        expect(res.body.status).toEqual(422);
        expect(res.body.message).toContain('name incorrect');
        done();
      });
      test('update without any dataToUpdate ', async (done) => {
        const res = await request
          .put('/api/trainee')
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .send({
            dataToUpdate: {},
            id: '' });
            // console.log('6------->', res.body);
        expect(res.body).toHaveProperty('error');
        expect(res.body.status).toEqual(422);
        expect(res.body.message).toEqual(['dataToUpdate is required']);
        done();
      });
    });
