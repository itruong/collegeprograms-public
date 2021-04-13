const fetch = require('node-fetch');


const getQueryParams = (req) => {
  const rawQuery = ['?']
  Object.keys(req.query).forEach(key => {
    rawQuery.push(`${key}=${req.query[key]}`);
    rawQuery.push('&');
  });
  rawQuery.pop();
  if (rawQuery.length) {
    return rawQuery.join('')
  } else {
    return ''
  }
}

const relayRequest = async (req, res, url) => {
  const queryString = getQueryParams(req);
  const request = {
    method: req.method,
    headers: {
      'Authorization': req.headers.authorization,
      'Content-Type': 'application/json'
    }
  };
  if (req.method !== 'HEAD' && req.method !== 'GET') {
    request.body = JSON.stringify(req.body);
  }
  const response = await fetch(
    `${url}${queryString}`,
    request
  );
  console.log(req.method)
  res.status(response.status).send(await response.json());
}

module.exports = {
  getQueryParams,
  relayRequest
};
