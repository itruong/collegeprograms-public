import {
  RECEIVE_CREATE_USER_FAILURE,
  RECEIVE_CREATE_USER_SUCCESS,
  REQUEST_CREATE_USER,
  RECEIVE_GET_CURRENT_USER_FAILURE,
  RECEIVE_GET_CURRENT_USER_SUCCESS,
  REQUEST_GET_CURRENT_USER,
  RECEIVE_UPDATE_USER_FAILURE,
  RECEIVE_UPDATE_USER_SUCCESS,
  REQUEST_UPDATE_USER,
  SET_USER_SIGNED_IN,
  SET_USER_SIGNED_OUT
} from './actions';


const user = (state = {
  isFetching: false,
  isSignedIn: false,
  profile: null
}, action) => {
  switch (action.type) {
    case RECEIVE_CREATE_USER_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case RECEIVE_CREATE_USER_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        profile: action.profile
      }
    case REQUEST_CREATE_USER:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case RECEIVE_GET_CURRENT_USER_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case RECEIVE_GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        profile: action.profile
      }
    case REQUEST_GET_CURRENT_USER:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case RECEIVE_UPDATE_USER_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case RECEIVE_UPDATE_USER_SUCCESS:
      return {
        ...state,
        isFetching: action.isFetching,
        profile: action.profile
      }
    case REQUEST_UPDATE_USER:
      return {
        ...state,
        isFetching: action.isFetching
      };
    case SET_USER_SIGNED_IN:
      return {
        isFetching: false,
        isSignedIn: true,
        profile: null
      }
    case SET_USER_SIGNED_OUT:
      return {
        isFetching: false,
        isSignedIn: false,
        profile: null
      };
    default:
      return state;
  }
};

export default {
  user
};
