import { RECEIVE_ALL_USERS } from '../../actions/user_actions';
import { RECEIVE_QUESTIONS } from '../../actions/question_actions';

const pageReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_ALL_USERS:
      return action.page;
    case RECEIVE_QUESTIONS:
      return action.page;
    default:
      return oldState;
  }
};

export default pageReducer;