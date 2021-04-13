const express = require('express');
const {
  body,
  checkSchema,
  header,
  query,
  validationResult
} = require('express-validator');
const controllers = require('./controllers');
const middleware = require('./middleware');
const validators = require('./validators');


const router = express.Router();

router.get(
  '/',
  [
    header('authorization').isString()
  ],
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
    } else {
      controllers.getUsers(req, res).catch(error => next(error));
    }
  }
);

router.post(
  '/',
  validators.profileValidators,
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
    } else {
      controllers.createUser(req, res).catch(error => next(error));
    }
  }
);

router.get(
  '/token',
  [
    query('type').isIn(['organization', 'student'])
  ],
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
    } else {
      controllers.getUserById(req, res).catch(error => next(error));
    }
  }
);

router.put(
  '/token',
  validators.profileValidators,
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
    } else {
      controllers.updateUserById(req, res).catch(error => next(error));
    }
  }
)

module.exports = router;