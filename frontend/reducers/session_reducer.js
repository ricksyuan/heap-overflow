import {
  RECEIVE_CURRENT_USER,
  LOGOUT_CURRENT_USER,
} from '../actions/session_actions';
import merge from 'lodash/merge';

// TODO: Why make a null user?
// TODO: should this be NULL SESSION?
const _nullUser = Object.freeze({id: null});

const sessionReducer = (state = _nullUser, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      return merge({}, { currentUser });
    case LOGOUT_CURRENT_USER:
      return _nullUser;
    default:
      return state;      
  }
};

export default sessionReducer;