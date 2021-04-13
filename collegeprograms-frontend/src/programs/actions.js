import helpers from './helpers';


export const RESET_PROGRAMS_FILTERS = 'RESET_PROGRAMS_FILTERS';
export function resetProgramsFilters() {
  return {
    type: RESET_PROGRAMS_FILTERS
  }
}

export const RESET_SAVED_PROGRAMS_FILTERS = 'RESET_SAVED_PROGRAMS_FILTERS';
export function resetSavedProgramsFilters() {
  return {
    type: RESET_SAVED_PROGRAMS_FILTERS
  }
}

// export const REQUEST_DELETE_PROGRAM = 'REQUEST_DELETE_PROGRAM';
// function requestDeleteProgram(programId) {
//   return {
//     type: REQUEST_DELETE_PROGRAM,
//     programId
//   };
// }

export const RECEIVE_UNSAVE_PROGRAM_FAILURE = 'RECEIVE_UNSAVE_PROGRAM_FAILURE';
function receiveUnsaveProgramFailure(programId) {
  return {
    type: RECEIVE_UNSAVE_PROGRAM_FAILURE,
    programId
  }
}

export const RECEIVE_UNSAVE_PROGRAM_SUCCESS = 'RECEIVE_UNSAVE_PROGRAM_SUCCESS';
function receiveUnsaveProgramSuccess(programId) {
  return {
    type: RECEIVE_UNSAVE_PROGRAM_SUCCESS,
    programId
  }
}

export function unsaveProgram(programId) {
  return function (dispatch) {
    let response;
    return helpers.deleteProgram(programId).then(res => {
      response = res;
      return res.json();
    }).then(result => {
      if (response.status !== 200) {
        console.log(result.data);
        dispatch(receiveUnsaveProgramFailure(programId));
      } else {
        dispatch(receiveUnsaveProgramSuccess(programId));
      }
      return response;
    })
  }
}

export const RECEIVE_GET_PROGRAMS_FAILURE = 'RECEIVE_GET_PROGRAMS_FAILURE';
function receiveGetProgramsFailure() {
  return {
    type: RECEIVE_GET_PROGRAMS_FAILURE,
    isFetching: false
  }
}

export const RECEIVE_GET_PROGRAMS_SUCCESS = 'RECEIVE_GET_PROGRAMS_SUCCESS';
function receiveGetProgramsSuccess(data) {
  return {
    type: RECEIVE_GET_PROGRAMS_SUCCESS,
    countPerPage: data.countPerPage,
    data: data.data,
    isFetching: false,
    page: data.page,
    totalCount: data.totalCount,
    totalPages: data.totalPages
  }
}

export const REQUEST_GET_PROGRAMS = 'REQUEST_GET_PROGRAMS';
function requestGetPrograms() {
  return {
    type: REQUEST_GET_PROGRAMS,
    isFetching: true
  };
}

export function getPrograms() {
  return function (dispatch, getState) {
    dispatch(requestGetPrograms());
    const args = helpers.getProgramArgsFromState(getState(), 'programs');
    let response;
    return helpers.getPrograms(args).then(res => {
      response = res;
      return res.json();
    }).then(result => {
      if (response.status !== 200) {
        console.log(result.data);
        return dispatch(receiveGetProgramsFailure());
      } else {
        return dispatch(receiveGetProgramsSuccess(result));
      }
    })
  }
}

export const RECEIVE_GET_SAVED_PROGRAMS_FAILURE = 'RECEIVE_GET_SAVED_PROGRAMS_FAILURE';
function receiveGetSavedProgramsFailure() {
  return {
    type: RECEIVE_GET_SAVED_PROGRAMS_FAILURE,
    isFetching: false
  }
}

export const RECEIVE_GET_SAVED_PROGRAMS_SUCCESS = 'RECEIVE_GET_SAVED_PROGRAMS_SUCCESS';
function receiveGetSavedProgramsSuccess(data) {
  return {
    type: RECEIVE_GET_SAVED_PROGRAMS_SUCCESS,
    countPerPage: data.countPerPage,
    data: data.data,
    isFetching: false,
    page: data.page,
    totalCount: data.totalCount,
    totalPages: data.totalPages
  }
}

export const REQUEST_GET_SAVED_PROGRAMS = 'REQUEST_GET_SAVED_PROGRAMS';
function requestGetSavedPrograms() {
  return {
    type: REQUEST_GET_SAVED_PROGRAMS,
    isFetching: true
  };
}

export function getSavedPrograms() {
  return function (dispatch, getState) {
    dispatch(requestGetSavedPrograms());
    const args = helpers.getProgramArgsFromState(getState(), 'savedPrograms');
    let response;
    return helpers.getSavedPrograms(args).then(res => {
      response = res;
      return res.json();
    }).then(result => {
      if (response.status !== 200) {
        console.log(result.data);
        return dispatch(receiveGetSavedProgramsFailure());
      } else {
        return dispatch(receiveGetSavedProgramsSuccess(result));
      }
    })
  }
}

// export const REQUEST_SAVE_PROGRAM = 'REQUEST_SAVE_PROGRAM';
// function requestSaveProgram(programId) {
//   return {
//     type: REQUEST_SAVE_PROGRAM,
//     programId
//   };
// }

export const RECEIVE_SAVE_PROGRAM_FAILURE = 'RECEIVE_SAVE_PROGRAM_FAILURE';
function receiveSaveProgramFailure(programId) {
  return {
    type: RECEIVE_SAVE_PROGRAM_FAILURE,
    programId
  }
}

export const RECEIVE_SAVE_PROGRAM_SUCCESS = 'RECEIVE_SAVE_PROGRAM_SUCCESS';
function receiveSaveProgramSuccess(programId) {
  return {
    type: RECEIVE_SAVE_PROGRAM_SUCCESS,
    programId,
    isSaved: true
  }
}

export function saveProgram(programId) {
  return function (dispatch) {
    // dispatch(requestSaveProgram(programId));
    let response;
    return helpers.saveProgram(programId).then(res => {
      response = res;
      return res.json()
    }).then(result => {
      if (response.status !== 200) {
        console.log(result.data);
        dispatch(receiveSaveProgramFailure(programId));
      } else {
        dispatch(receiveSaveProgramSuccess(programId));
      }
      return response;
    })
  }
}

export const SET_PROGRAMS_FILTERS = 'SET_PROGRAMS_FILTERS';
export function setProgramsFilters(filters) {
  return function (dispatch) {
    dispatch({
      type: SET_PROGRAMS_FILTERS,
      filters
    });
    // dispatch(getPrograms());
  }
}

export const SET_PROGRAMS_PAGE = 'SET_PROGRAMS_PAGE';
export function setProgramsPage(page) {
  return function (dispatch) {
    dispatch({
      type: SET_PROGRAMS_PAGE,
      isFetching: true,
      page
    });
    dispatch(getPrograms());
  }
}

export const SET_SAVED_PROGRAMS_FILTERS = 'SET_SAVED_PROGRAMS_FILTERS';
export function setSavedProgramsFilters(filters) {
  return function (dispatch) {
    dispatch({
      type: SET_SAVED_PROGRAMS_FILTERS,
      filters
    });
  }
}

export const SET_SAVED_PROGRAMS_PAGE = 'SET_SAVED_PROGRAMS_PAGE';
export function setSavedProgramsPage(page) {
  return function (dispatch) {
    dispatch({
      type: SET_SAVED_PROGRAMS_PAGE,
      isFetching: true,
      page
    });
    dispatch(getSavedPrograms());
  }
}
