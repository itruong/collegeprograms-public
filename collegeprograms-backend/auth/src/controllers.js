const helpers = require('./helpers');


const getUserId = async (req, res, authAdmin) => {
  try {
    res.status(200).send(await helpers.getVerifiedUser(req, authAdmin));
  } catch (reason) {
    res.status(401).send({
      uid: null,
      error: reason
    });
  }
};

module.exports = {
  getUserId
}
