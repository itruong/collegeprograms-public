const mongoose = require('mongoose');
const esConnection = require('config/esConfig');


const UserProgramSchema = new mongoose.Schema({
  applicationFee: Number,
  applicationProcess: [String],
  city: String,
  cost: Number,
  deadlineDate: Date,
  description: String,
  diversity: [String],
  endDate: Date,
  genders: [String],
  GPA: Number,
  ineligibility: [String],
  maxAge: Number,
  maxClassYear: Number,
  minAge: Number,
  minClassYear: Number,
  name: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  postedDate: {
    type: Date,
    required: true
  },
  programId: {
    type: String,
    required: true
  },
  races: [String],
  startDate: Date,
  state: String,
  types: [String],
  userId: {
    type: String,
    required: true
  }
});

// TODO: abstract out es indexing logic to parent class
class UserProgramClass {
  static getIndexMappings () {
    return {
      'user-programs-index': {
        applicationProcess: { type: 'keyword' },
        deadlineDate: { type: 'date' },
        description: {
          analyzer: 'english',
          type: 'text'
        },
        diversity: { type: 'keyword' },
        endDate: { type: 'date' },
        genders: { type: 'keyword' },
        GPA: { type: 'half_float' },
        maxAge: { type: 'integer' },
        maxClassYear: { type: 'integer' },
        minAge: { type: 'integer' },
        minClassYear: { type: 'integer' },
        name: {
          analyzer: 'english',
          type: 'text'
        },
        organization: {
          analyzer: 'standard',
          type: 'text'
        },
        postedDate: { type: 'date' },
        startDate: { type: 'date' },
        races: { type: 'keyword' },
        types: { type: 'keyword' },
        userId: { type: 'keyword' }
      }
    };
  };

  async addIndexedDocument (indexName) {
    await esConnection.client.index({
      index: indexName,
      id: this._id,
      body: this.toIndexMapping(indexName)
    });
  }

  static bulkIndex = async (data) => {
    const { body: bulkResponse } = await esConnection.client.bulk({ refresh: true, body: data });
    if (bulkResponse.errors) {
      const errorDocuments = [];
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0];
        if (action[operation].error) {
          errorDocuments.push({
            status: action[operation].status,
            error: action[operation].error,
            operation: body[i * 2],
            document: body[i * 2 + 1]
          });
        }
      });
      console.log(errorDocuments);
    }
  }

  async deleteIndexedDocument (indexName, refresh) {
    return await esConnection.client.delete({
      index: indexName,
      id: this._id,
      refresh: refresh || 'false'
    });
  }

  async updateIndexedDocument (indexName) {
    await esConnection.client.update({
      index: indexName,
      id: this._id,
      body: {
        doc: this.toIndexMapping(indexName)
      }
    });
  }

  static reindex = async (indexName) => {
    console.log('start reindex')
    const res = await esConnection.client.indices.exists({ index: indexName });
    if (res.statusCode === 200) {
      console.log('deleting index')
      await esConnection.client.indices.delete({ index: indexName });
    }
    console.log('index removed')

    await esConnection.client.indices.create({
      index: indexName,
      body: {
        mappings: {
          properties: {
            ...UserProgram.getIndexMappings()[indexName]
          }
        }
      }
    });

    console.log('index created')

    const programs = await UserProgram.find({}).exec();
    let programsToIndex = [];
    let count = 0;
    programs.forEach(async (program) => {
      count ++;
      console.log(`program ${count}`)
      programsToIndex.push({
        index: {
          _index: indexName,
          _id: program._id
        }
      });
      programsToIndex.push(program.toIndexMapping(indexName));
      if ((count + 1) % 500 === 0) {
        await UserProgram.bulkIndex(programsToIndex);
        programsToIndex = [];
      }
    });
    if (programsToIndex.length) {
      await UserProgram.bulkIndex(programsToIndex);
    }
    console.log(`Indexed ${count} programs`);
  }

  toIndexMapping (indexName) {
    const indexMapping = UserProgram.getIndexMappings()[indexName];
    const mapping = {};
    Object.keys(indexMapping).forEach(key => {
      if (this[key]) {
        mapping[key] = this[key];
      }
    });
    mapping.id = this._id;
    return mapping;
  }
};

UserProgramSchema.loadClass(UserProgramClass);
UserProgramSchema.post('save', function(doc, next) {
  const indexNames = Object.keys(UserProgram.getIndexMappings());
  const promises = []
  indexNames.forEach(indexName => {
    promises.push(doc.addIndexedDocument(indexName));
  });
  Promise.all(promises).then(_ => next());
});
// UserProgramSchema.pre('deleteOne', { document: false, query: true }, function(next) {
//   console.log('delete')
//   console.log(this.getFilter()['_id'])
//   const indexNames = Object.keys(UserProgram.getIndexMappings());
//   indexNames.forEach(indexName => {
//     esConnection.client.delete({
//       index: indexName,
//       id: this.getFilter()['_id'],
//     });
//   });
//   next();
// });
UserProgramSchema.pre('deleteOne', { document: true, query: false }, function(next) {
  const indexNames = Object.keys(UserProgram.getIndexMappings());
  let promises = [];
  indexNames.forEach(indexName => {
    promises.push(this.deleteIndexedDocument(indexName));
  });
  Promise.all(promises).then(_ => next());
});
UserProgramSchema.post('save', function(doc, next) {
  const indexNames = Object.keys(UserProgram.getIndexMappings());
  let promises = [];
  indexNames.forEach(indexName => {
    promises.push(doc.updateIndexedDocument(indexName));
  });
  Promise.all(promises).then(_ => next());
});
UserProgramSchema.post('updateOne', function(doc, next) {
  const indexNames = Object.keys(UserProgram.getIndexMappings());
  indexNames.forEach(indexName => {
    doc.updateIndexedDocument(indexName);
  });
  next();
});

if (!UserProgramSchema.options.toObject) UserProgramSchema.options.toObject = {};
UserProgramSchema.options.toObject.transform = function (doc, ret, options) {
  ret.id = String(ret._id);
  delete ret._id;
  delete ret.__t;
  delete ret.__v;
  return ret;
}

const UserProgram = mongoose.model('user_programs', UserProgramSchema);

module.exports = UserProgram;
