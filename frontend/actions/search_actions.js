import * as SearchAPIUtil from '../utils/search_api_util';

export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';
export const RECEIVE_SEARCH_ERRORS = 'RECEIVE_SEARCH_ERRORS';

export const receiveSearchResults = (payload) => {
  return {
    type: RECEIVE_SEARCH_RESULTS,
    questions: payload.questions,
    users: payload.users,
    tags: payload.tags,
    query: payload.query,
  };
};

export const receiveSearchErrors = (errors) => {
  return {
    type: RECEIVE_SEARCH_ERRORS,
    errors: errors
  };
}

export const searchQuestions = (query) => (dispatch) => {
  return SearchAPIUtil.searchQuestions(query).then(
    (payload) => dispatch(receiveSearchResults(payload)),
    (errors) => dispatch(receiveSearchErrors(errors.responseJSON))
  );
};
