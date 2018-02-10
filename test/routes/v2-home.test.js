
const request = require('supertest');
const app = require('../../src/app');

beforeAll((done) => {
  app.on('ready', () => {
    done();
  });
});

//------------------------------------------------------------
//                     Home Page V2
//------------------------------------------------------------

test('It should return home info', () => {
  return request(app).get('/v2').then((response) => {
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('organization', 'r/SpaceX');
    expect(response.body).toHaveProperty('organization_link', 'https://github.com/r-spacex');
    expect(response.body).toHaveProperty('project_link', 'https://github.com/r-spacex/SpaceX-API');
    expect(response.body).toHaveProperty('project_name', 'SpaceX-API');
    expect(response.body).toHaveProperty('version');
  });
});
