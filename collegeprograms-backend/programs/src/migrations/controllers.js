const moment = require('moment');
const Program = require('models/Program');
const UserProgram = require('models/UserProgram');
const esConnection = require('config/esConfig');


const addPostedDate = async (req, res) => {
  await Program.updateMany(
    {
      "postedDate": {
        '$exists': false 
      }
    },
    {
      "$set": {
        "postedDate" : moment().format('MM/DD/YYYY')
      }
    }
  );
  res.status(200).send();
};

const reindexPrograms = async (req, res) => {
  // const result = await esConnection.client.search({
  //   index: 'programs-index',
  //   body: {
  //     query: {
  //       match_all: {}
  //     }
  //   }
  // });
  // console.log(result);
  await Program.reindex(req.query.index);
  res.status(200).send();
}

const reindexUserPrograms = async (req, res) => {
  await UserProgram.reindex(req.query.index);
  res.status(200).send();
}

const indexPrograms = async () => {
  const result = await esConnection.client.indices.create({
    index: 'programs-index',
    body: {
      mappings: {
        properties: {

        }
      }
    }
  })
}

module.exports = {
  addPostedDate,
  reindexPrograms,
  reindexUserPrograms
};
