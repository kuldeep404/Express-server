import * as supertest from 'supertest';
import Database from '../libs/Database';
import { config } from '../config';
import { Server } from '../server';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();
const server = new Server(config);
const request = supertest(server.application());
let token;


describe('fetch trainee details', () => {
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
  test('create trainee successfully', async () => {
    const res = await request
      .post('/api/trainee')
      .set('Authorization', token)
      .send({
        email: 'rajiv@successive.tech',
        name: 'rajiv',
        password: 'rajiv@123' });

    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('name');
    expect(res.body.data.name).toEqual('rajiv');
    expect(res.body.status).toEqual(200);
    expect(res.body.message).toMatch('trainee create successful');

  });

  test('create trainee with existing email', async () => {
    const res = await request
      .post('/api/trainee')
      .set('Authorization', token)
      .send({
        email: 'rajiv@successive.tech',
        name: 'ram',
        password: 'ram@123' });
    expect(res.body).toHaveProperty('error');
    // expect(res.body.status).toEqual(400);
    expect(res.body.status).toEqual(400);
    expect(res.body .message).toEqual('user already exists');

  });

  test('create trainee without body', async () => {
    const res = await request
      .post('/api/trainee')
      .set('Authorization', token);

    expect(res.body.status).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body .error).toEqual('Bad request ');
    expect(res.body.message).toContain('email is required');
    expect(res.body.message).toContain('name is required');
    expect(res.body.message).toContain('password is required');

  });

  test('create trainee with wrong input type', async () => {
    const res = await request
      .post('/api/trainee')
      .set('Authorization', token)
      .send({
        email: 'ram@succesive.tech',
        name: 'ram@.',
        password: '' });
    expect(res.body.status).toEqual(422);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Bad request ');
    expect(res.body.message).toEqual(['name is not correct', 'email is not correct', 'password cannot be empty']);

  });

});
