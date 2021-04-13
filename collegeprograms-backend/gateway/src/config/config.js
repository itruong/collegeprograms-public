const _ = require('lodash');
const config = require('./config.json');


// const defaultConfig = config.development;

const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];

// const finalConfig = _.merge(defaultConfig, environmentConfig);
const finalConfig = environmentConfig;

finalConfig.origins.allowedOrigins = [].concat(finalConfig.origins.external, finalConfig.origins.internal);

module.exports = finalConfig;
