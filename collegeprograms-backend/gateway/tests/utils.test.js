const utils = require('../utils.js');

it('flattens DynamoDB item object to {AttributeName: value}', () => {
  const item = {
    uid: {S: 'test1'},
    email: {S: 'test1@ivantruong.com'},
  };
  const flattenedItem = {
    uid: 'test1',
    email: 'test1@ivantruong.com',
  };
  expect(utils.itemToJSON(item)).toStrictEqual(flattenedItem);
});

it('creates DynamoDB item object from object', () => {
  const obj = {
    uid: 'test1',
    email: 'test1@ivantruong.com'
  };
  const item = {
    uid: {S: 'test1'},
    email: {S: 'test1@ivantruong.com'},
  };
  expect(utils.JSONtoItem(obj)).toStrictEqual(item);
});