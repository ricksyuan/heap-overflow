import {
  RECEIVE_SEARCH_RESULTS,
  RECEIVE_SEARCH_ERRORS,
} from '../../actions/search_actions';

const _nullQuery = {
  parsedString: '',
  type: 'NONE',
}
const queryReducer = (oldState = _nullQuery, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case RECEIVE_SEARCH_RESULTS:
      return action.query;
    case RECEIVE_SEARCH_ERRORS:
      return _nullQuery;
    default:
      return oldState;
  }
};

export default queryReducer;