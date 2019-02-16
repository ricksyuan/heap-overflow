import { combineReducers } from 'redux';
import popupReducer from '../../reducers/ui/popup_reducer';
import filterReducer from '../../reducers/ui/filter_reducer';
import parsedQueryReducer from './parsed_query_reducer';

const uiReducer = combineReducers({
  popup: popupReducer,
  filter: filterReducer,
  parsedQuery: parsedQueryReducer,
});

export default uiReducer;