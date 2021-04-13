
const getIdToken = (req) => {
  // Parse the injected ID token from the request header.
  const authorizationHeader = req.headers.authorization || '';
  const components = authorizationHeader.split(' ');
  return components.length > 1 ? components[1] : '';
};

const getVerifiedUser = (req, authAdmin) => {
  const idToken = getIdToken(req);
  if (process.env.NODE_ENV === 'localhost' && idToken === 'devId') {
    return { uid: 'devId'};
  }
  return authAdmin.auth().verifyIdToken(idToken);
};

module.exports = {
  getVerifiedUser
};
