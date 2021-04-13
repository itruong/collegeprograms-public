const mongoose = require('mongoose');
const moment = require('moment');
const User = require('./User');


const StudentUserSchema = new mongoose.Schema({
  userType: String,
  gender: String,
  birthday: Date,
  race: String,
  eligibility: [String],
  schoolId: mongoose.Schema.Types.ObjectId,
  classYear: String,
  majors: [String],
  minors: [String],
  GPA: Number,
  industryPreferences: [String]
});

if (!StudentUserSchema.options.toObject) StudentUserSchema.options.toObject = {};
StudentUserSchema.options.toObject.transform = function (doc, ret, options) {
  delete ret._id;
  delete ret.firebaseId;
  delete ret.__t;
  delete ret.__v;
  ret.birthday = ret.birthday ? moment(ret.birthday).format('MM/DD/YYYY') : ret.birthday;
  ret.GPA = ret.GPA ? ret.GPA.toFixed(1) : '';
  return ret;
}

const StudentUser = User.discriminator(
  'studentUsers',
  StudentUserSchema
);

module.exports = StudentUser;
