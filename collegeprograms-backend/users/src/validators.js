const {
  body
} = require('express-validator');
const moment = require('moment');
const constants = require('./constants');


const classYearValidator = (value) => {
  const currentYear = moment().year() + 22;
  return value >= 1920 && value <= currentYear;
}

const dateValidator = (value) => {
  const date = moment(value, 'MM/DD/YYYY');
  return date.format('MM/DD/YYYY') === value;
};

const profileValidators = [
  body('userType').isIn(['organization', 'student']),
  body('firstName').isString(),
  body('lastName').isString(),
  body('gender').optional().isIn(constants.genders),
  body('birthday').optional().custom(dateValidator),
  body('race').optional().isIn(constants.races),
  body('eligibility.*').optional().isIn(constants.eligibility),
  body('school').optional().isString(),
  body('classYear').optional().isInt().custom(classYearValidator),
  body('majors.*').optional().isIn(constants.degreePrograms),
  body('minors.*').optional().isIn(constants.degreePrograms),
  body('GPA').optional().isDecimal().custom(value => value >= 0 && value <= 4),
  body('industryPreferences.*').optional().isIn(constants.industryPreferenes)
];

module.exports = {
  dateValidator,
  profileValidators
};
