const express = require('express');
const controllers = require('./controllers');
const Program = require('models/Program');
const UserProgram = require('models/UserProgram');
const {
  query,
  validationResult
} = require('express-validator');


const router = express.Router();

// router.get(
//   '/postedDate',
//   (req, res) => {
//     controllers.addPostedDate(req, res);
//   }
// );

router.get(
  '/reindex-programs',
  [
    query('index').isIn(Object.keys(Program.getIndexMappings()))
  ],
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
    } else {
      controllers.reindexPrograms(req, res).catch(error => next(error));
    }
  }
);

router.get(
  '/reindex-user-programs',
  [
    query('index').isIn(Object.keys(UserProgram.getIndexMappings()))
  ],
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
    } else {
      controllers.reindexUserPrograms(req, res).catch(error => next(error));
    }
  }
);

module.exports = router;
