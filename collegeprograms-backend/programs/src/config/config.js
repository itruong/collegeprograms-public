const config = require('./config.json');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];

environmentConfig.databases = {
  mongodb: {
    url: process.env.MONGO_CONNECTION
  }
};

const finalConfig = environmentConfig;

module.exports = finalConfig;
