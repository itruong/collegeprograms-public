const express = require('express');
const {
  body,
  query,
  validationResult
} = require('express-validator');
const controllers = require('./controllers');
const validators = require('./validators');
const constants = require('./constants');


const router = express.Router();

router.get(
  '/',
  [
    query('age').optional().isInt().custom(value => value > 0 && value <= 120),
    query('classYear').optional().isInt().custom(validators.classYearValidator),
    query('countPerPage').isInt().custom(value => value > 0),
    query('distance').optional().isInt(),
    query('diversity.*').optional().isIn(constants.diversity),
    query('endDate').optional().custom(validators.dateValidator),
    query('excludeApplication.*').optional().isIn(constants.applicationProcesses),
    query('gender').optional().isIn(constants.genders),
    query('GPA').optional().isDecimal().custom(value => value >= 0 && value <= 4),
    query('page').isInt().custom(value => value > 0),
    query('postedDate').optional().custom(validators.dateValidator),
    query('race').optional().isIn(constants.races),
    query('searchText').optional().isString(),
    query('startDate').optional().custom(validators.dateValidator),
    query('sortBy').optional().isIn(constants.sortByOptions),
    query('types.*').optional().isIn(constants.programTypes),
  ],
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
    } else {
      if (req.query.searchText) {
        controllers.getPaginatedProgramsWithSearch(req, res).catch(error => next(error));
      } else {
        controllers.getPaginatedPrograms(req, res).catch(error => next(error));
      }
    }
  }
);

router.post(
  '/',
  validators.programValidators,
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
    } else {
      controllers.createProgram(req, res).catch(error => next(error));
    }
  }
);

router.get(
  '/single-program',
  [
    query('id').custom(validators.objectIdValidator)
  ],
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ error: result.array() });
    } else {
      controllers.getProgramById(req, res).catch(error => next(error));
    }
  }
)

router.get(
  '/savedPrograms',
  [
    query('age').optional().isInt().custom(value => value > 0 && value <= 120),
    query('classYear').optional().isInt().custom(validators.classYearValidator),
    query('countPerPage').isInt().custom(value => value > 0),
    query('distance').optional().isInt(),
    query('diversity.*').optional().isIn(constants.diversity),
    query('endDate').optional().custom(validators.dateValidator),
    query('excludeApplication.*').optional().isIn(constants.applicationProcesses),
    query('gender').optional().isIn(constants.genders),
    query('GPA').optional().isDecimal().custom(value => value >= 0 && value <= 4),
    query('page').isInt().custom(value => value > 0),
    query('postedDate').optional().custom(validators.dateValidator),
    query('race').optional().isIn(constants.races),
    query('searchText').optional().isString(),
    query('startDate').optional().custom(validators.dateValidator),
    query('sortBy').optional().isIn(constants.sortByOptions),
    query('types.*').optional().isIn(constants.programTypes),
  ],
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
    } else {
      // if (req.query.searchText) {
      //   controllers.getPaginatedUserProgramsWithSearch(req, res).catch(error => next(error));
      // } else {
      //   controllers.getPaginatedUserPrograms(req, res).catch(error => next(error));
      // }
      controllers.getPaginatedUserPrograms(req, res).catch(error => next(error));
    }
  }
)

router.post(
  '/savedPrograms',
  [
    body('programId').custom(validators.objectIdValidator)
  ],
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
    } else {
      controllers.createUserProgram(req, res).catch(error => next(error));
    }
  }
)

router.delete(
  '/savedPrograms',
  [
    body('programId').custom(validators.objectIdValidator)
  ],
  (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      res.status(400).send({ errors: result.array() });
    } else {
      controllers.removeUserProgram(req, res).catch(error => next(error));
    }
  }
)

module.exports = router;
