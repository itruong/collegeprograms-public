const UserProgram = require('./models/UserProgram');
const moment = require('moment');


getProgramsQueryES = (args) => {
  const {
    age,
    classYear,
    distance,
    diversity,
    endDate,
    excludeApplication,
    gender,
    GPA,
    postedDate,
    race,
    searchText,
    startDate,
    types
  } = args;
  const ageQuery = {
    bool: {
      must: [
        {
          should: [
            {
              range: { minAge: { lte: age } }
            },
            { 
              bool: {
                must_not: { exists: { field: 'minAge' } }
              }
            }
          ]
        },
        {
          should: [
            {
              range: { minAge: { gte: age } }
            },
            { 
              bool: {
                must_not: { exists: { field: 'maxAge' } }
              }
            }
          ]
        },
      ]
    }
  };
  const classYearQuery = {
    bool: {
      must: [
        {
          should: [
            {
              range: { minClassYear: { lte: classYear } }
            },
            { 
              bool: {
                must_not: { exists: { field: 'minClassYear' } }
              }
            }
          ]
        },
        {
          should: [
            {
              range: { maxClassYear: { gte: classYear } }
            },
            { 
              bool: {
                must_not: { exists: { field: 'maxClassYear' } }
              }
            }
          ]
        },
      ]
    }
  };
  const deadlineDateQuery = {
    bool: {
      should: [
        { range: { deadlineDate: { gte: 'now/d' } } },
        {
          bool: {
            must_not: { exists: { field: 'deadlineDate' } }
          }
        }
      ]
    }
  };
  const diversityQuery = {
    bool: {
      should: [
        {
          terms: {
            diversity: diversity
          }
        },
        { 
          bool: {
            must_not: { exists: { field: 'diversity' } }
          }
        }
      ]
    }
  };
  const endDateQuery = {
    bool: {
      should: [
        {
          range: {
            endDate: {
              lte: `${moment.utc(endDate, 'MM/DD/YYYY').format()}||/d`
            }
          }
        },
        {
          bool: {
            must_not: { exists: { field: 'endDate' } }
          }
        }
      ]
    }
  };
  const excludeApplicationQuery = {
    bool: {
      should: [
        {
          bool: {
            must_not: { terms: { applicationProcess: { excludeApplication } } }
          }
        },
        {
          bool: {
            must_not: { exists: { field: 'applicationProcess' } }
          }
        }
      ]
    }
  };
  const genderQuery = {
    bool: {
      should: [
        {
          term: {
            genders: gender
          }
        },
        { 
          bool: {
            must_not: { exists: { field: 'genders' } }
          }
        }
      ]
    }
  };
  const GPAQuery = {
    bool: {
      should: [
        {
          range: { GPA: { lte: GPA } }
        },
        { 
          bool: {
            must_not: { exists: { field: 'GPA' } }
          }
        }
      ]
    }
  };
  const postedDateQuery = {
    range: { postedDate: { gte: `${moment.utc(postedDate, 'MM/DD/YYYY').format()}||/d` } }
  };
  const raceQuery = {
    bool: {
      should: [
        {
          term: {
            races: race
          }
        },
        { 
          bool: {
            must_not: { exists: { field: 'races' } }
          }
        }
      ]
    }
  };
  const startDateQuery = {
    bool: {
      should: [
        {
          range: {
            startDate: {
              lte: `${moment.utc(startDate, 'MM/DD/YYYY').format()}||/d`
            }
          }
        },
        {
          bool: {
            must_not: { exists: { field: 'startDate' } }
          }
        }
      ]
    }
  };
  const typesQuery = {
    bool: {
      should: [
        {
          terms: {
            types: types
          }
        },
        { 
          bool: {
            must_not: { exists: { field: 'types' } }
          }
        }
      ]
    }
  };

  const filters = [deadlineDateQuery];
  if (age) {
    filters.push(ageQuery);
  }
  if (classYear) {
    filters.push(classYearQuery);
  }
  if (diversity) {
    filters.push(diversityQuery);
  }
  if (endDate) {
    filters.push(endDateQuery);
  }
  if (excludeApplication) {
    filters.push(excludeApplicationQuery)
  }
  if (gender) {
    filters.push(genderQuery);
  }
  if (GPA) {
    filters.push(GPAQuery);
  }
  if (postedDate) {
    filters.push(postedDateQuery);
  }
  if (race) {
    filters.push(raceQuery);
  }
  if (startDate) {
    filters.push(startDateQuery);
  }
  if (types) {
    filters.push(typesQuery);
  }

  const query = {
    // match_all: {}
    bool: {
      should: [
        {
          dis_max: {
            queries: [
              {
                match: {
                  description: {
                    query: searchText,
                    boost: 1,
                    fuzziness: 'AUTO'
                  }
                }
              },
              {
                match_phrase: {
                  description: {
                    query: searchText,
                    boost: 2
                  }
                }
              }
            ]
          }
        },
        {
          dis_max: {
            queries: [
              {
                match: {
                  name: {
                    query: searchText,
                    boost: 1,
                    fuzziness: 'AUTO'
                  }
                }
              },
              {
                match_phrase: {
                  name: {
                    query: searchText,
                    boost: 2
                  }
                }
              }
            ],
            boost: 2
          }
        },
        {
          dis_max: {
            queries: [
              {
                match_phrase: {
                  organization: {
                    query: searchText,
                    boost: 1
                  }
                }
              }
            ],
            boost: 4
          }
        },
      ],
      minimum_should_match: 1,
      filter: [
        {
          bool: {
            must: filters
          }
        }
      ]
    }
  };
  return query;
}

getProgramsQueryMongo = (args) => {
  const {
    age,
    classYear,
    distance,
    diversity,
    endDate,
    excludeApplication,
    gender,
    GPA,
    postedDate,
    race,
    startDate,
    types
  } = args;
  const query = {
    $and: [
      age ? {
        $and: [
          {
            $or: [
              { minAge: { $lte: age } },
              { minAge: { $exists: false } }
            ]
          },
          {
            $or: [
              { maxAge: { $gte: age } },
              { maxAge: { $exists: false } }
            ]
          }
        ],
      } : {},
      classYear ? {
        $and: [
          {
            $or: [
              { minClassYear: { $lte: classYear } },
              { minClassYear: { $exists: false } }
            ]
          },
          {
            $or: [
              { maxClassYear: { $gte: classYear } },
              { maxClassYear: { $exists: false } }
            ]
          }
        ],
      } : {},
      {
        $or: [
          { deadlineDate: { $gte: moment().format('MM/DD/YYYY') } },
          { deadlineDate: { $exists: false } }
        ]
      },
      diversity ? {
        $or: [
          { diversity: { $in: diversity || [] } },
          { diversity: { $exists: false } }
        ]
      } : {},
      endDate ? {
        $or: [
          { endDate: { $lte: endDate } },
          { endDate: { $exists: false } }
        ]
      } : {},
      excludeApplication ? {
        $or: [
          { applicationProcess: { $nin: excludeApplication || [] } },
          { applicationProcess: { $exists: false } }
        ]
      } : {},
      gender ? {
        $or: [
          { genders: gender },
          { genders: { $exists: false } }
        ]
      } : {},
      GPA ? {
        $or: [
          { GPA: { $lte: GPA } },
          { GPA: { $exists: false } }
        ]
      } : {},
      postedDate ? {
        postedDate: { $gte: postedDate }
      } : {},
      race ? {
        $or: [
          { races: race },
          { races: { $exists: false } }
        ]
      } : {},
      startDate ? {
        $or: [
          { startDate: { $gte: startDate } },
          { startDate: { $exists: false } }
        ]
      } : {},
      types ? {
        $or : [
          { types: { $in: types || [] } },
          { types: { $exists: false } }
        ]
      } : {}
    ]
  };
  return query;
}

getProgramsSortQueryES = (args) => {
  const {
    sortBy
  } = args;

  let sortQuery = ['_score'];
  if (sortBy === 'posted_date') {
    sortQuery = [
      { postedDate: { order: 'desc' } },
      '_score'
    ];
  } else if (sortBy === 'deadline_date') {
    sortQuery = [
      { deadlineDate: { order: 'asc' } },
      '_score'
    ];
  }
  return sortQuery;
}

getProgramsSortQueryMongo = (args) => {
  const {
    sortBy
  } = args;

  let sortQuery = null;
  if (sortBy === 'posted_date') {
    sortQuery = { postedDate: -1 };
  } else if (sortBy === 'deadline_date') {
    sortQuery = { deadlineDate: 1 };
  }
  return sortQuery;
}

getSavedProgramsQueryES = (args) => {
  const {
    age,
    classYear,
    distance,
    diversity,
    endDate,
    excludeApplication,
    gender,
    GPA,
    postedDate,
    race,
    searchText,
    startDate,
    types,
    userId
  } = args;
  const ageQuery = {
    bool: {
      must: [
        {
          should: [
            {
              range: { minAge: { lte: age } }
            },
            { 
              bool: {
                must_not: { exists: { field: 'minAge' } }
              }
            }
          ]
        },
        {
          should: [
            {
              range: { minAge: { gte: age } }
            },
            { 
              bool: {
                must_not: { exists: { field: 'maxAge' } }
              }
            }
          ]
        },
      ]
    }
  };
  const classYearQuery = {
    bool: {
      must: [
        {
          should: [
            {
              range: { minClassYear: { lte: classYear } }
            },
            { 
              bool: {
                must_not: { exists: { field: 'minClassYear' } }
              }
            }
          ]
        },
        {
          should: [
            {
              range: { maxClassYear: { gte: classYear } }
            },
            { 
              bool: {
                must_not: { exists: { field: 'maxClassYear' } }
              }
            }
          ]
        },
      ]
    }
  };
  const deadlineDateQuery = {
    bool: {
      should: [
        { range: { deadlineDate: { gte: 'now/d' } } },
        {
          bool: {
            must_not: { exists: { field: 'deadlineDate' } }
          }
        }
      ]
    }
  };
  const diversityQuery = {
    bool: {
      should: [
        {
          terms: {
            diversity: diversity
          }
        },
        { 
          bool: {
            must_not: { exists: { field: 'diversity' } }
          }
        }
      ]
    }
  };
  const endDateQuery = {
    bool: {
      should: [
        {
          range: {
            endDate: {
              lte: `${moment.utc(endDate, 'MM/DD/YYYY').format()}||/d`
            }
          }
        },
        {
          bool: {
            must_not: { exists: { field: 'endDate' } }
          }
        }
      ]
    }
  };
  const excludeApplicationQuery = {
    bool: {
      should: [
        {
          bool: {
            must_not: { terms: { applicationProcess: { excludeApplication } } }
          }
        },
        {
          bool: {
            must_not: { exists: { field: 'applicationProcess' } }
          }
        }
      ]
    }
  };
  const genderQuery = {
    bool: {
      should: [
        {
          term: {
            genders: gender
          }
        },
        { 
          bool: {
            must_not: { exists: { field: 'genders' } }
          }
        }
      ]
    }
  };
  const GPAQuery = {
    bool: {
      should: [
        {
          range: { GPA: { lte: GPA } }
        },
        { 
          bool: {
            must_not: { exists: { field: 'GPA' } }
          }
        }
      ]
    }
  };
  const postedDateQuery = {
    range: { postedDate: { gte: `${moment.utc(postedDate, 'MM/DD/YYYY').format()}||/d` } }
  };
  const raceQuery = {
    bool: {
      should: [
        {
          term: {
            races: race
          }
        },
        { 
          bool: {
            must_not: { exists: { field: 'races' } }
          }
        }
      ]
    }
  };
  const startDateQuery = {
    bool: {
      should: [
        {
          range: {
            startDate: {
              lte: `${moment.utc(startDate, 'MM/DD/YYYY').format()}||/d`
            }
          }
        },
        {
          bool: {
            must_not: { exists: { field: 'startDate' } }
          }
        }
      ]
    }
  };
  const typesQuery = {
    bool: {
      should: [
        {
          terms: {
            types: types
          }
        },
        { 
          bool: {
            must_not: { exists: { field: 'types' } }
          }
        }
      ]
    }
  };
  const userIdQuery = {
    term: { userId }
  };

  const filters = [
    deadlineDateQuery,
    userIdQuery
  ];
  if (age) {
    filters.push(ageQuery);
  }
  if (classYear) {
    filters.push(classYearQuery);
  }
  if (diversity) {
    filters.push(diversityQuery);
  }
  if (endDate) {
    filters.push(endDateQuery);
  }
  if (excludeApplication) {
    filters.push(excludeApplicationQuery)
  }
  if (gender) {
    filters.push(genderQuery);
  }
  if (GPA) {
    filters.push(GPAQuery);
  }
  if (postedDate) {
    filters.push(postedDateQuery);
  }
  if (race) {
    filters.push(raceQuery);
  }
  if (startDate) {
    filters.push(startDateQuery);
  }
  if (types) {
    filters.push(typesQuery);
  }

  const query = {
    // match_all: {}
    bool: {
      should: [
        {
          dis_max: {
            queries: [
              {
                match: {
                  description: {
                    query: searchText,
                    boost: 1,
                    fuzziness: 'AUTO'
                  }
                }
              },
              {
                match_phrase: {
                  description: {
                    query: searchText,
                    boost: 2
                  }
                }
              }
            ]
          }
        },
        {
          dis_max: {
            queries: [
              {
                match: {
                  name: {
                    query: searchText,
                    boost: 1,
                    fuzziness: 'AUTO'
                  }
                }
              },
              {
                match_phrase: {
                  name: {
                    query: searchText,
                    boost: 2
                  }
                }
              }
            ],
            boost: 2
          }
        },
        {
          dis_max: {
            queries: [
              {
                match_phrase: {
                  organization: {
                    query: searchText,
                    boost: 1
                  }
                }
              }
            ],
            boost: 4
          }
        },
      ],
      minimum_should_match: 1,
      filter: [
        {
          bool: {
            must: filters
          }
        }
      ]
    }
  };
  return query;
}

getSavedProgramsQueryMongo = (args) => {
  const {
    age,
    classYear,
    distance,
    diversity,
    endDate,
    excludeApplication,
    gender,
    GPA,
    postedDate,
    race,
    startDate,
    types,
    userId
  } = args;
  const query = {
    $and: [
      age ? {
        $and: [
          {
            $or: [
              { minAge: { $lte: age } },
              { minAge: { $exists: false } }
            ]
          },
          {
            $or: [
              { maxAge: { $gte: age } },
              { maxAge: { $exists: false } }
            ]
          }
        ],
      } : {},
      classYear ? {
        $and: [
          {
            $or: [
              { minClassYear: { $lte: classYear } },
              { minClassYear: { $exists: false } }
            ]
          },
          {
            $or: [
              { maxClassYear: { $gte: classYear } },
              { maxClassYear: { $exists: false } }
            ]
          }
        ],
      } : {},
      {
        $or: [
          { deadlineDate: { $gte: moment().format('MM/DD/YYYY') } },
          { deadlineDate: { $exists: false } }
        ]
      },
      diversity ? {
        $or: [
          { diversity: { $in: diversity || [] } },
          { diversity: { $exists: false } }
        ]
      } : {},
      endDate ? {
        $or: [
          { endDate: { $lte: endDate } },
          { endDate: { $exists: false } }
        ]
      } : {},
      excludeApplication ? {
        $or: [
          { applicationProcess: { $nin: excludeApplication || [] } },
          { applicationProcess: { $exists: false } }
        ]
      } : {},
      gender ? {
        $or: [
          { genders: gender },
          { genders: { $exists: false } }
        ]
      } : {},
      GPA ? {
        $or: [
          { GPA: { $lte: GPA } },
          { GPA: { $exists: false } }
        ]
      } : {},
      postedDate ? {
        postedDate: { $gte: postedDate }
      } : {},
      race ? {
        $or: [
          { races: race },
          { races: { $exists: false } }
        ]
      } : {},
      startDate ? {
        $or: [
          { startDate: { $gte: startDate } },
          { startDate: { $exists: false } }
        ]
      } : {},
      types ? {
        $or : [
          { types: { $in: types || [] } },
          { types: { $exists: false } }
        ]
      } : {},
      { userId }
    ]
  };
  return query;
}

async function identifySavedPrograms (data, userId) {
  const savedPrograms = await UserProgram.find(
    {
      programId: {
        $in: data.map(program => program.id)
      },
      userId
    },
    'programId'
  ).exec();
  const savedIds = new Set(savedPrograms.map(userProgram => userProgram.programId));

  return data.map(program => {
    const cleanedProgram = program.toObject();
    if (savedIds.has(cleanedProgram.id)) {
      cleanedProgram.isSaved = true;
    }
    return cleanedProgram;
  });
}

module.exports = {
  getProgramsQueryES,
  getProgramsQueryMongo,
  getProgramsSortQueryES,
  getProgramsSortQueryMongo,
  getSavedProgramsQueryES,
  getSavedProgramsQueryMongo,
  identifySavedPrograms
};
