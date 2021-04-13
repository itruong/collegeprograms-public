const {
  body
} = require('express-validator');
const mongoose = require('mongoose');
const moment = require('moment');
const constants = require('./constants');

const objectIdValidator = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

const classYearValidator = (value) => {
  const currentYear = moment().year() + 22;
  return value >= 1920 && value <= currentYear;
}

const dateValidator = (value) => {
  const date = moment(value, 'MM/DD/YYYY');
  return date.format('MM/DD/YYYY') === value;
};

const stateValidator = (value) => {
  const states = constants.states;
  return value in states;
};

const programValidators = [
  body('name').isString(),
  body('organization').optional().isString(),
  body('state').optional().custom(stateValidator),
  body('city').isString(),
  body('classYear').optional().isInt().custom(classYearValidator),
  body('eligibility.*').optional().isIn(['testEligibility']),
  body('ineligibility.*').optional().isIn(['testEligibility']),
  body('GPA').optional().isDecimal().custom(value => value >= 0 && value <= 4),
  body('type').isString(),
  body('startDate').custom(dateValidator),
  body('endDate').custom(dateValidator),
  body('cost').optional().isDecimal(),
  body('travelCoverage').optional().isString(),
  body('description').isString(),
  body('applicationFee').optional().isDecimal(),
  body('applicationProcess.*').optional().isString(),
  body('deadlineDate').custom(dateValidator),
  body('decisionDate').custom(dateValidator),
  body('url').isString()
];

module.exports = {
  dateValidator,
  objectIdValidator,
  programValidators
};
