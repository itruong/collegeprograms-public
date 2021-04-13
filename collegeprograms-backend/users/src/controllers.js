const User = require('./models/User');
const StudentUser = require('./models/StudentUser');
const OrganizationUser = require('./models/OrganizationUser');


const createUser = async (req, res) => {
  const existingUser = await User.findOne({
    firebaseId: req.headers.user
  });
  if (!existingUser) {
    const data = {
      ...req.body,
      firebaseId: req.headers.user
    };
    const user = await new StudentUser(data).save();
    res.status(200).send({ data: user.toObject() });
  } else {
    res.status(400).send({
      error: 'User already exists.',
      data: existingUser.toObject()
    });
  }
  
};

const getUsers = async (req, res) => {
  const firebaseId = req.headers.user;
  const authQuery = firebaseId ? { firebaseId } : {};
  const data = await User.find({
    ...authQuery,
    ...req.query
  }).exec();
  res.status(200).send({ data });
};

const getUserById = async (req, res) => {
  const firebaseId = req.headers.user;
  let user;
  if (req.query.type === 'student') {
    user = await StudentUser.findOne({
      firebaseId
    });
  } else {
    user = await OrganizationUser.findOne({
      firebaseId
    });
  }
  

  res.status(200).send({ data: user ? user.toObject() : null });
};

const updateUserById = async (req, res) => {
  const updateFields = [
    'email',
    'firstName',
    'lastName',
    'gender',
    'birthday',
    'race',
    'eligibility',
    'schoolId',
    'classYear',
    'majors',
    'minors',
    'GPA',
    'industryPreferences'
  ];
  const data = {};
  updateFields.forEach(field => {
    if (req.body[field]) {
      data[field] = req.body[field];
    } else {
      data[field] = null;
    }
  });

  try {
    const result = (await StudentUser.findOneAndUpdate(
      {
        firebaseId: req.headers.user
      },
      data,
      { new: true }
    )).toObject();
    res.status(200).send({ data: result });
  } catch (e) {
    res.status(400).send({ errors: [e]});
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById
};
