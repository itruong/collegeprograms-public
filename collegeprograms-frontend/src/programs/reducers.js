import {
  RECEIVE_GET_PROGRAMS_FAILURE,
  RECEIVE_GET_PROGRAMS_SUCCESS,
  REQUEST_GET_PROGRAMS,
  RECEIVE_GET_SAVED_PROGRAMS_FAILURE,
  RECEIVE_GET_SAVED_PROGRAMS_SUCCESS,
  REQUEST_GET_SAVED_PROGRAMS,
  RECEIVE_SAVE_PROGRAM_FAILURE,
  RECEIVE_SAVE_PROGRAM_SUCCESS,
  RECEIVE_UNSAVE_PROGRAM_FAILURE,
  RECEIVE_UNSAVE_PROGRAM_SUCCESS,
  RESET_PROGRAMS_FILTERS,
  RESET_SAVED_PROGRAMS_FILTERS,
  SET_PROGRAMS_FILTERS,
  SET_PROGRAMS_PAGE,
  SET_SAVED_PROGRAMS_FILTERS,
  SET_SAVED_PROGRAMS_PAGE
} from './actions';
import helpers from './helpers';


const programs = (state = {
  countPerPage: 10,
  data: [],
  filters: helpers.getInitialProgramFilters(),
  isFetching: false,
  page: 1,
  totalCount: 0,
  totalPages: 1
}, action) => {
  switch (action.type) {
    case RECEIVE_GET_PROGRAMS_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case RECEIVE_GET_PROGRAMS_SUCCESS:
      return {
        ...state,
        countPerPage: action.countPerPage,
        data: action.data,
        isFetching: action.isFetching,
        page: action.page,
        totalCount: action.totalCount,
        totalPages: action.totalPages
      };
    case REQUEST_GET_PROGRAMS:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_SAVE_PROGRAM_FAILURE:
      return state;
    case RECEIVE_SAVE_PROGRAM_SUCCESS:
      return {
        ...state,
        data: state.data.map(program => {
          if (program.id === action.programId) {
            return {
              ...program,
              isSaved: true
            }
          } else {
            return program;
          }
        })
      }
    case RECEIVE_UNSAVE_PROGRAM_FAILURE:
      return state;
    case RECEIVE_UNSAVE_PROGRAM_SUCCESS:
      return {
        ...state,
        data: state.data.map(program => {
          if (program.id === action.programId) {
            return {
              ...program,
              isSaved: false
            }
          } else {
            return program;
          }
        })
      }
    case RESET_PROGRAMS_FILTERS:
      return {
        ...state,
        filters: helpers.getInitialProgramFilters()
      };
    case SET_PROGRAMS_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.filters
        }
      };
    case SET_PROGRAMS_PAGE:
      return {
        ...state,
        page: action.page
      };
    default:
      return state;
  }
};

const savedPrograms = (state = {
  countPerPage: 10,
  data: [],
  filters: helpers.getInitialProgramFilters(),
  isFetching: false,
  page: 1,
  totalCount: 0,
  totalPages: 1
}, action) => {
  switch(action.type) {
    case RECEIVE_GET_SAVED_PROGRAMS_FAILURE:
      return {
        ...state,
        isFetching: false
      }; 
    case RECEIVE_GET_SAVED_PROGRAMS_SUCCESS:
      return {
        ...state,
        countPerPage: action.countPerPage,
        data: action.data,
        isFetching: action.isFetching,
        page: action.page,
        totalCount: action.totalCount,
        totalPages: action.totalPages
      };
    case REQUEST_GET_SAVED_PROGRAMS:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_UNSAVE_PROGRAM_FAILURE:
      return state;
    case RECEIVE_UNSAVE_PROGRAM_SUCCESS:
      return {
        ...state,
        data: state.data.filter(program => program.programId !== action.programId)
      };
    case RESET_SAVED_PROGRAMS_FILTERS:
      return {
        ...state,
        filters: helpers.getInitialProgramFilters()
      };
    case SET_SAVED_PROGRAMS_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.filters
        }
      };
    case SET_SAVED_PROGRAMS_PAGE:
      return {
        ...state,
        page: action.page
      };
    default:
      return state
  }
  
};

export default {
  programs,
  savedPrograms
};
