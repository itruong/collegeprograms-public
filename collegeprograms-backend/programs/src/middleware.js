
const defaultErrorHandlerMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ errors: ['An issue occurred.'] });
}

const requestPrintMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} ${JSON.stringify(req.body)}`);
  next();
};

const resourceNotFoundHandler = (req, res, next) => {
  res.status(404).send({ errors: ['Resource not found.'] });
};

module.exports = {
  defaultErrorHandlerMiddleware,
  requestPrintMiddleware,
  resourceNotFoundHandler
}
