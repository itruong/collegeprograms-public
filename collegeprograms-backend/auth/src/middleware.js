
const resourceNotFoundHandler = (req, res, next) => {
  res.status(404).send({'error': 'Resource not found.'});
};

module.exports = {
  resourceNotFoundHandler
};