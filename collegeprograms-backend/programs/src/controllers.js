const fetch = require('node-fetch');
const moment = require('moment');
const Program = require('./models/Program');
const UserProgram = require('./models/UserProgram');
const config = require('./config/config');
const esConnection = require('config/esConfig');
const helpers = require('./helpers');


const createProgram = async (req, res) => {
  let response = await fetch(
    `${config.routing.gateway}/users/token`,
    {
      method: 'GET',
      headers: {
        user: req.headers.user
      }
    }
  );
  response = await response.json();
  const currentUser = response.data;
  const {
    name,
    organization,
    city,
    state,
    classYear,
    eligibility,
    ineligibility,
    GPA,
    type,
    startDate,
    endDate,
    cost,
    travelCoverage,
    description,
    applicationFee,
    applicationProcess,
    deadlineDate,
    decisionDate,
    url
  } = req.body;
  const data = {
    author: `${currentUser.firstName} ${currentUser.lastName}`,
    authorId: req.headers.user,
    postedDate: moment().format('MM/DD/YYYY'),
    name,
    organization,
    city,
    state,
    classYear,
    eligibility,
    ineligibility,
    GPA,
    type,
    startDate,
    endDate,
    cost,
    travelCoverage,
    description,
    applicationFee,
    applicationProcess,
    deadlineDate,
    decisionDate,
    url
  };

  const program = await new Program(data).save();
  res.status(200).send({ data: program });
};

const createUserProgram = async (req, res) => {
  const foundUserProgram = await UserProgram.findOne({
    programId: req.body.programId,
    userId: req.headers.user
  });
  if (!foundUserProgram) {
    const program = await Program.findById(req.body.programId).exec()
    if (program) {
      const {
        name,
        organization,
        postedDate,
        city,
        state,
        classYear,
        eligibility,
        ineligibility,
        type,
        startDate,
        description,
        deadlineDate
      } = program;

      const data = {
        programId: req.body.programId,
        userId: req.headers.user,
        name,
        organization,
        postedDate,
        savedDate: moment().format('MM/DD/YYYY'),
        city,
        state,
        classYear,
        eligibility,
        ineligibility,
        type,
        startDate,
        description,
        deadlineDate
      };

      const userProgram = await new UserProgram(data).save();
      res.status(200).send({ data: userProgram });
    } else {
      res.status(400).send({ errors: ['Program does not exist.']});
    }
  } else {
    res.status(400).send({
      error: 'Program is already saved.',
      data: foundUserProgram
    });
  }
}

const getPaginatedPrograms = async (req, res) => {
  const page = parseInt(req.query.page);
  const countPerPage = parseInt(req.query.countPerPage);
  const query = helpers.getProgramsQueryMongo(req.query);
  const sortQuery = helpers.getProgramsSortQueryMongo(req.query);

  const getProgramsPromise = Program.find(
    query,
    null,
    {
      sort: sortQuery,
      skip: (page - 1) * countPerPage,
      limit: countPerPage
    }
  ).exec().then(data => {
    return helpers.identifySavedPrograms(data, req.headers.user);
  });

  const getProgramCountPromise = Program.find(
    query
  ).countDocuments();

  const [data, totalCount] = await Promise.all([getProgramsPromise, getProgramCountPromise]);
  const totalPages = Math.ceil(totalCount / countPerPage);

  res.status(200).send({
    countPerPage,
    data,
    page,
    totalPages,
    totalCount
  });
}

const getPaginatedProgramsWithSearch = async (req, res) => {
  let page = parseInt(req.query.page);
  const countPerPage = parseInt(req.query.countPerPage);
  
  const { body } = await esConnection.client.search({
    index: 'programs-index', // TODO: add to constants
    body: {
      query: helpers.getProgramsQueryES(req.query),
      from: (page - 1) * countPerPage,
      size: countPerPage,
      sort: helpers.getProgramsSortQueryES(req.query),
      track_total_hits: 10000,
      _source: false
    }
  });
  console.log(`total hits: ${body.hits.total.value}`);

  const totalCount = body.hits.total.value;
  const matchedIds = body.hits.hits.map(doc => doc._id);

  let data = await Program.find(
    { _id: matchedIds }
  ).exec();

  data = await helpers.identifySavedPrograms(data, req.headers.user);
  const documentsById = {};
  data.forEach(doc => {
    documentsById[doc.id] = doc;
  });

  data = []
  matchedIds.forEach(id => {
    if (documentsById[id]) {
      data.push(documentsById[id]);
    }
  });

  const totalPages = Math.max(Math.ceil(body.hits.total.value / countPerPage), 1);
  page = Math.max(Math.min(totalPages, page), 1);

  res.status(200).send({
    countPerPage,
    data,
    page,
    totalCount,
    totalPages
  });
}

const getPaginatedUserPrograms = async (req, res) => {
  const page = parseInt(req.query.page);
  const countPerPage = parseInt(req.query.countPerPage);
  const query = helpers.getSavedProgramsQueryMongo({
    ...req.query,
    userId: req.headers.user
  });
  const sortQuery = helpers.getProgramsSortQueryMongo(req.query);
  const getProgramsPromise = UserProgram.find(
    query,
    null,
    {
      skip: (page - 1) * countPerPage,
      sort: sortQuery,
      limit: countPerPage
    }
  ).exec().then(data => {
    return data.map(program => program.toObject());
  });

  const getProgramCountPromise = await UserProgram.find(
    query
  ).countDocuments();

  const [data, totalCount] = await Promise.all([getProgramsPromise, getProgramCountPromise]);
  const totalPages = Math.ceil(totalCount / countPerPage);
  
  res.status(200).send({
    countPerPage,
    data,
    page,
    totalCount,
    totalPages
  });
}

const getPaginatedUserProgramsWithSearch = async (req, res) => {
  let page = parseInt(req.query.page);
  const countPerPage = parseInt(req.query.countPerPage);
  
  const { body } = await esConnection.client.search({
    index: 'user-programs-index', // TODO: add to constants
    body: {
      query: helpers.getSavedProgramsQueryES({
        ...req.query,
        userId: req.headers.user
      }),
      from: (page - 1) * countPerPage,
      size: countPerPage,
      sort: helpers.getProgramsSortQueryES(req.query),
      track_total_hits: 10000,
      _source: false
    }
  });
  console.log(`total hits: ${body.hits.total.value}`);

  const totalCount = body.hits.total.value;
  const matchedIds = body.hits.hits.map(doc => doc._id);

  let data = await UserProgram.find(
    { _id: matchedIds }
  ).exec();

  const documentsById = {};
  data.forEach(doc => {
    documentsById[doc.id] = doc.toObject();
  });

  data = []
  matchedIds.forEach(id => {
    if (documentsById[id]) {
      data.push(documentsById[id]);
    }
  });

  const totalPages = Math.max(Math.ceil(body.hits.total.value / countPerPage), 1);
  page = Math.max(Math.min(totalPages, page), 1);

  res.status(200).send({
    countPerPage,
    data,
    page,
    totalCount,
    totalPages
  });
}

const getProgramById = async (req, res) => {
  const query = { _id: req.query.id };
  let program = await Program.findOne(query);
  if (program) {
    program = program.toObject();
    const savedProgram = await UserProgram.findOne(
      {
        programId: req.query.id,
        userId: req.headers.user
      },
      'programId'
    )
    if (savedProgram) {
      program.isSaved = true;
    }
    res.status(200).send({ data: program });
  } else {
    res.status(400).send({ error: 'Program not found.' });
  }
}

const removeUserProgram = async (req, res) => {
  const program = await UserProgram.findOne(
    {
      programId: req.body.programId,
      userId: req.headers.user
    },
    '_id'
  );
  // TODO: use query middleware deleteOne?
  program.deleteOne(null, function(err, doc) {
    res.status(200).send({});
  })
  // if (program) {
  //   try {
  //     await program.deleteOne();
  //     res.status(200).send({});
  //   } catch (e) {
  //     res.status(500).send({ 'error': 'An error occurred while removing the program.' });
  //   }
  // } else {
  //   res.status(400).send({ 'error': 'Program does not exist.' });
  // }
  
  // if (result.deletedCount === 1) {
  //   res.status(200).send({});
  // } else {
  //   if (result.n === 0) {
  //     res.status(400).send({ 'error': 'Program does not exist.' });
  //   }
  //   res.status(400).send({ 'error': 'Program was not be removed.' });
  // }
}

const removeUserProgramById = async (req, res) => {
  await UserProgram.deleteOne({
    _id: req.body.id
  });
  res.status(200).send();
}

module.exports = {
  createProgram,
  createUserProgram,
  getPaginatedPrograms,
  getPaginatedProgramsWithSearch,
  getPaginatedUserPrograms,
  getPaginatedUserProgramsWithSearch,
  getProgramById,
  removeUserProgram
};
