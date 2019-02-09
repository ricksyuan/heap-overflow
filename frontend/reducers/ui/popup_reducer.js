import { OPEN_POPUP, CLOSE_POPUP } from '../../actions/popup_actions';

const popupReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {
    case OPEN_POPUP:
      return action.popup;
    case CLOSE_POPUP:
      return null;
    default:
      return oldState;    
  }
};

export default popupReducer