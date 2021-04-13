const OrganizationUser = require('./models/OrganizationUser');
const StudentUser = require('./models/StudentUser');


const userTypes = {
  student: StudentUser,
  organization: OrganizationUser
};

const degreePrograms = [
  'computer_science',
  'economics',
  'mechanical_engineering'
];

const eligibility = [
  'first_generation_college_student',
  'international_student',
  'LGBTQ',
  'low_income_student',
  'us_citizen'
];

const industryPreferenes = [
  'education',
  'engineering'
];

const genders = [
  'male',
  'female',
  'other'
];

const races = [
  'asian',
  'other'
];

module.exports = {
  degreePrograms,
  eligibility,
  genders,
  industryPreferenes,
  races,
  userTypes
};
