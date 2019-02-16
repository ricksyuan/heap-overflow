import { combineReducers } from 'redux';
import popupReducer from '../../reducers/ui/popup_reducer';
import filterReducer from '../../reducers/ui/filter_reducer';
import queryReducer from './query_reducer';

const uiReducer = combineReducers({
  popup: popupReducer,
  filter: filterReducer,
  query: queryReducer,
});

export default uiReducer;