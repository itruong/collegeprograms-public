import config from './config.json';

console.log(process.env)
const environment = process.env.REACT_APP_ENV || 'development';
const environmentConfig = config[environment];

const finalConfig = environmentConfig;

export default finalConfig;
