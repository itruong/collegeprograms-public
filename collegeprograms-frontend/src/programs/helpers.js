import moment from 'moment';
import config from 'config/config';


const getInitialProgramFilters = () => {
  const args = {
    ageFilter: '',
    classYearFilter: '',
    distanceFilter: '',
    diversityFilter: [],
    endDateFilter: null,
    excludeApplicationFilter: [],
    genderFilter: '',
    GPAFilter: '',
    isFiltersExpanded: false,
    postedDateFilter: '',
    raceFilter: '',
    searchText: '',
    startDateFilter: null,
    sortByFilter: 'most_relevant',
    typeFilter: []
  };
  return args;
};

const getPrograms = async (args) => {
  let queryString = [];
  Object.keys(args).forEach(key => {
    if (args[key]) {
      if (Array.isArray(args[key])) {
        args[key].forEach(value => {
          queryString.push(`${key}[]=${value}`);
        });
      } else {
        queryString.push(`${key}=${args[key]}`);
      }
    }
  });
  console.log(queryString)
  queryString = queryString.join('&');

  return await fetch(`${config.SERVER_BASE_URL}/programs?${queryString}`);
};

const getProgramArgsFromState = (state, category) => {
  let programs;
  if (category === 'programs') {
    programs = state.programs;
  } else if (category === 'savedPrograms') {
    programs = state.savedPrograms;
  }
  const args = {
    page: programs.page,
    countPerPage: programs.countPerPage,
    age: programs.filters.ageFilter,
    classYear: programs.filters.classYearFilter,
    distance: programs.filters.distanceFilter,
    diversity: programs.filters.diversityFilter,
    endDate: programs.filters.endDateFilter,
    excludeApplication: programs.filters.excludeApplicationFilter,
    gender: programs.filters.genderFilter,
    GPA: programs.filters.GPAFilter,
    postedDate: programs.filters.postedDateFilter,
    startDate: programs.filters.startDateFilter,
    race: programs.filters.raceFilter,
    searchText: programs.filters.searchText,
    sortBy: programs.filters.sortByFilter,
    types: programs.filters.typeFilter
  };

  if (args.postedDate === 'day') {
    args.postedDate = moment().format('MM/DD/YYYY')
  } else if (args.postedDate === 'week') {
    args.postedDate = moment().subtract(7, 'days').format('MM/DD/YYYY')
  } else if (args.postedDate === 'month') {
    args.postedDate = moment().subtract(30, 'days').format('MM/DD/YYYY')
  }
  return args;
}

const getSavedPrograms = async (args) => {
  let queryString = [];
  Object.keys(args).forEach(key => {
    if (args[key]) {
      if (Array.isArray(args[key])) {
        args[key].forEach(value => {
          queryString.push(`${key}[]=${value}`);
        });
      } else {
        queryString.push(`${key}=${args[key]}`);
      }
    }
  });
  console.log(queryString)
  queryString = queryString.join('&');

  return await fetch(`${config.SERVER_BASE_URL}/programs/savedprograms?${queryString}`);
}

const getTextPastDate = (dateString) => {
  const date = moment(dateString, 'MM/DD/YYYY');
  const numDays = moment().diff(date, 'days');
  if (numDays === 0) {
    return 'Today';
  } else if (numDays < 7) {
    return `${numDays} days ago`;
  } else if (numDays < 30) {
    return `${Math.round(numDays / 7)} weeks ago`;
  } else {
    return `${Math.round(numDays / 30)} months ago`;
  }
};

const deleteProgram = async (programId) => {
  const data = { programId };
  const res = await fetch(
    `${config.SERVER_BASE_URL}/programs/savedPrograms`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  );
  return res;
}

const saveProgram = async (programId) => {
  const data = { programId };
  const res = await fetch(
    `${config.SERVER_BASE_URL}/programs/savedPrograms`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  );
  return res;
}

export default {
  deleteProgram,
  getInitialProgramFilters,
  getPrograms,
  getProgramArgsFromState,
  getSavedPrograms,
  getTextPastDate,
  saveProgram
};
