export { default as userRouter } from './routes';


// test('get trainee with limit', async (done) => {
      //   const res = await request
      //     .get('/api/trainee/?skip=0')
      //     .set('Authorization', token);
      //     console.log('2.---------->', res.body);
      //   expect(res.body).toHaveProperty('status');
      //   expect(res.body.data.length).toBeLessThanOrEqual(1);
      //   done();
      // });
    //   test('try to fetch all trainee with limit and skip', async (done) => {
    //     const res = await request
    //       .get('/api/trainee/?limit=1&skip=0')
    //       .set('Authorization', token);
    //       console.log('3.---------->', res.body);
    //     expect(res.body).toHaveProperty('data');
    //     expect(res.body.data).toHaveProperty('count');
    //     expect(res.body.data).toHaveProperty('records');
    //     expect(res.body.data.records.length).toBeLessThanOrEqual(1);
    //     done();
    //   });
