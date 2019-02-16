import {
  RECEIVE_SEARCH_RESULTS,
} from '../../actions/search_actions';

const parsedQueryReducer = (oldState = '', action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_SEARCH_RESULTS:
      return action.parsedQuery;
    default:
      return oldState;
  }
};

export default parsedQueryReducer;