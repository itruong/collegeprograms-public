import { combineReducers } from 'redux';
import programsReducers from 'programs/reducers';
import usersReducers from 'users/reducers';

export default combineReducers({
  ...programsReducers,
  ...usersReducers
});
