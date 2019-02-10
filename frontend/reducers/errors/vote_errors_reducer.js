import {
  RECEIVE_VOTE_ERRORS,
} from '../../actions/vote_actions';

const _nullErrors = [];

const voteErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_VOTE_ERRORS:
      return action.errors;
    default:
      return _nullErrors;
  }
};

export default voteErrorsReducer;