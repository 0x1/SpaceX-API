
const request = require('supertest');
const app = require('../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                     Launch Sort Test
//------------------------------------------------------------

test('It should return past launches sorted from smallest to greatest', async () => {
  const response = await request(app.callback()).get('/v2/launches?order=asc');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('flight_number', 1);
});

test('It should return past launches sorted from greatest to smallest', async () => {
  const response = await request(app.callback()).get('/v2/launches?order=desc');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1]).toHaveProperty('flight_number', 1);
});

test('It should return all launches sorted from greatest to smallest', async () => {
  const response = await request(app.callback()).get('/v2/launches/all?order=asc');
  expect(response.statusCode).toBe(200);
  expect(response.body[0]).toHaveProperty('flight_number', 1);
});

test('It should return all launches sorted from greatest to smallest', async () => {
  const response = await request(app.callback()).get('/v2/launches/all?order=desc');
  expect(response.statusCode).toBe(200);
  expect(response.body[response.body.length - 1]).toHaveProperty('flight_number', 1);
});
