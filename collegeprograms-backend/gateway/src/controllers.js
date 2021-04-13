const config = require('./config/config');
const helpers = require('./helpers');


const routePrograms = async (req, res, url) => {
  const baseUrl = `${config.routing.programs}${url}`;
  helpers.relayRequest(req, res, baseUrl);
};

const routeUsers = async (req, res, url) => {
  const baseUrl = `${config.routing.users}${url}`;
  helpers.relayRequest(req, res, baseUrl);
};

module.exports = {
  routePrograms,
  routeUsers
};
