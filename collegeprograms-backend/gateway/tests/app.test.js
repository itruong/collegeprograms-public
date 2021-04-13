require('../config/config.js');
const setup = require('./setup.js');
const request = require('supertest');
const app = require('../app.js');

describe('routing requests', () => {
  it('gets a profile', async () => {
    const params = {
      TableName: 'Profiles',
      Item: {
        uid: {S: 'ptest1'},
        email: {S: 'ptest1@ivantruong.com'},
        firstName: {S: 'ptestFirst1'},
        lastName: {S: 'ptestLast1'}
      }
    };
    const profile = {
      uid: 'ptest1',
      email: 'ptest1@ivantruong.com',
      firstName: 'ptestFirst1',
      lastName: 'ptestLast1'
    };
    await setup.addProfileItem(params);
    let res = await request(app).get("?uid=ptest1");
    expect(res.body.data).toStrictEqual(profile);
  });
});