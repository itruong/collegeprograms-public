const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  firebaseId: String,
  email: String,
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  }
});

class UserClass {
  get fullName () {
    return `${this.firstName} ${this.lastName}`;
  }
};

UserSchema.loadClass(UserClass);
const User = mongoose.model('users', UserSchema);

module.exports = User;
