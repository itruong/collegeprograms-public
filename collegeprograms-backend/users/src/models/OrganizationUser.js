const mongoose = require('mongoose');
const User = require('./User');


const OrganizationUserSchema = new mongoose.Schema({
  organizationId: {
    type: String,
    required: true
  },
  userType: String
});

const OrganizationUser = User.discriminator(
  'organizationUsers',
  OrganizationUserSchema
);

module.exports = OrganizationUser;
