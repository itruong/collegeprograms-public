const cors = require('cors');
const fetch = require('node-fetch');
const config = require('./config/config')


const authMiddleware = async (req, res, next) => {
  if (req.headers.authorization) {
    const authResponse = await fetch(
      config.routing.auth, 
      { headers: req.headers }
    );
    const data = await authResponse.json();
    if (authResponse.status !== 200) {
      res.status(authResponse.status).send(data);
    } else {
      req.headers.user = data.uid;
      next();
    }
  } else {
    next();
  }
};

const corsMiddleware = cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(config.origins.allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
});

const resourceNotFoundHandler = (req, res, next) => {
  res.status(404).send({'error': 'Resource not found.'});
};

module.exports = {
  authMiddleware,
  corsMiddleware,
  resourceNotFoundHandler
}
