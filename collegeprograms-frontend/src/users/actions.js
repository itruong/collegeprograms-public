import helpers from './helpers';


export const RECEIVE_CREATE_USER_FAILURE = 'RECEIVE_CREATE_USER_FAILURE';
function receiveCreateUserFailure() {
  return {
    type: RECEIVE_CREATE_USER_FAILURE,
    isFetching: false
  };
}

export const RECEIVE_CREATE_USER_SUCCESS = 'RECEIVE_CREATE_USER_SUCCESS';
function receiveCreateUserSuccess(profile) {
  return {
    type: RECEIVE_CREATE_USER_SUCCESS,
    isFetching: false,
    profile
  };
}

export const REQUEST_CREATE_USER = 'REQUEST_CREATE_USER';
function requestCreateUser() {
  return {
    type: REQUEST_CREATE_USER,
    isFetching: true
  };
}

export function createUser(args) {
  return function(dispatch) {
    dispatch(requestCreateUser());
    let response;
    helpers.createUser(args).then(res => {
      response = res;
      return res.json();
    }).then(result => {
      if (response.status !== 200) {
        console.log(result.data);
        dispatch(receiveCreateUserFailure());
      } else {
        dispatch(receiveCreateUserSuccess(result.data));
      }
    });
  };
}

export const RECEIVE_GET_CURRENT_USER_FAILURE = 'RECEIVE_GET_CURRENT_USER_FAILURE';
function receiveGetCurrentUserFailure() {
  return {
    type: RECEIVE_GET_CURRENT_USER_FAILURE,
    isFetching: false
  };
}

export const RECEIVE_GET_CURRENT_USER_SUCCESS = 'RECEIVE_GET_CURRENT_USER_SUCCESS';
function receiveGetCurrentUserSuccess(profile) {
  return {
    type: RECEIVE_GET_CURRENT_USER_SUCCESS,
    isFetching: false,
    profile
  };
}

export const REQUEST_GET_CURRENT_USER = 'REQUEST_GET_CURRENT_USER';
function requestGetCurrentUser() {
  return {
    type: REQUEST_GET_CURRENT_USER,
    isFetching: true
  };
}

export function getCurrentUser() {
  return function(dispatch, getState) {
    dispatch(requestGetCurrentUser());
    const isSignedIn = getState().user.isSignedIn;
    if (isSignedIn) {
      let response;
      return helpers.getCurrentUser().then(res => {
        response = res;
        return res.json();
      }).then(result => {
        if (response.status !== 200) {
          console.log(response)
          return dispatch(receiveGetCurrentUserFailure());
        } else {
          return dispatch(receiveGetCurrentUserSuccess(result.data));
        }
      });
    } else {
      return dispatch(receiveGetCurrentUserFailure())
    }
  };
}

export const SET_USER_SIGNED_IN = 'SET_USER_SIGNED_IN';
function setUserSignedIn() {
  return { type: SET_USER_SIGNED_IN };
}

export const SET_USER_SIGNED_OUT = 'SET_USER_SIGNED_OUT';
function setUserSignedOut() {
  return { type: SET_USER_SIGNED_OUT };
}

export function setAuthStatus(user) {
  return function(dispatch) {
    if (user) {
      dispatch(setUserSignedIn());
      return dispatch(getCurrentUser());
    } else {
      return dispatch(setUserSignedOut());
    }
  };
}

export const RECEIVE_UPDATE_USER_FAILURE = 'RECEIVE_UPDATE_USER_FAILURE';
function receiveUpdateUserFailure() {
  return {
    type: RECEIVE_UPDATE_USER_FAILURE,
    isFetching: false
  };
}

export const RECEIVE_UPDATE_USER_SUCCESS = 'RECEIVE_UPDATE_USER_SUCCESS';
function receiveUpdateUserSuccess(profile) {
  return {
    type: RECEIVE_UPDATE_USER_SUCCESS,
    isFetching: false,
    profile
  };
}

export const REQUEST_UPDATE_USER = 'REQUEST_UPDATE_USER';
function requestUpdateUser() {
  return {
    type: REQUEST_UPDATE_USER,
    isFetching: true
  };
}

export function updateUser(args) {
  return function(dispatch) {
    dispatch(requestUpdateUser());
    let response;
    return helpers.updateUser(args).then(res => {
      response = res;
      return res.json();
    }).then(result => {
      if (response.status !== 200) {
        console.log(result.data);
        dispatch(receiveUpdateUserFailure());
      } else {
        dispatch(receiveUpdateUserSuccess(result.data));
      }
    });
  };
};
