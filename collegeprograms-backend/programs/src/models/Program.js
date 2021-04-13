const mongoose = require('mongoose');
const esConnection = require('config/esConfig');


const ProgramSchema = new mongoose.Schema({
  applicationFee: Number,
  applicationProcess: [String],
  author: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    required: true
  },
  city: String,
  cost: Number,
  deadlineDate: Date,
  decisionDate: Date,
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
  races: [String],
  startDate: Date,
  state: String,
  travelCovered: String,
  types: [String],
  url: String
});

class ProgramClass {
  static getIndexMappings () {
    return {
      'programs-index': {
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
        types: { type: 'keyword' }
      }
    };
  };

  async addIndex (indexName) {
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

  async deleteIndex (indexName) {
    await esConnection.client.delete({
      index: indexName,
      id: this._id,
    });
  }

  async updateIndex (indexName) {
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
            ...Program.getIndexMappings()[indexName]
          }
        }
      }
    });

    const programs = await Program.find({}).exec();
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
        await Program.bulkIndex(programsToIndex);
        programsToIndex = [];
      }
    });
    await Program.bulkIndex(programsToIndex);
    console.log(`Indexed ${count} programs`);
  }

  toIndexMapping (indexName) {
    const indexMapping = Program.getIndexMappings()[indexName];
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

ProgramSchema.loadClass(ProgramClass);

if (!ProgramSchema.options.toObject) ProgramSchema.options.toObject = {};
ProgramSchema.options.toObject.transform = function (doc, ret, options) {
  ret.id = String(ret._id);
  delete ret._id;
  delete ret.__t;
  delete ret.__v;
  return ret;
}

const Program = mongoose.model('programs', ProgramSchema);

module.exports = Program;
