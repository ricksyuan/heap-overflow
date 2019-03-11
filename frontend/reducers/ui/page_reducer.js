import { RECEIVE_ALL_USERS } from '../../actions/user_actions';

const pageReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_USERS:
      return action.page;
    default:
      return oldState;
  }
};

export default pageReducer;