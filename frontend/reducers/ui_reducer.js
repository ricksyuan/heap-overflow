import merge from 'lodash/merge';

const uiReducer = (oldState = {}, action) => {
  Object.freeze(oldState);
  switch (action.type) {  
    default:
      return oldState;
  }
};

export default uiReducer;