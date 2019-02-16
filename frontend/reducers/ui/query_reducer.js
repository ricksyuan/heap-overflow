import {
  RECEIVE_SEARCH_RESULTS,
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
    default:
      return oldState;
  }
};

export default queryReducer;