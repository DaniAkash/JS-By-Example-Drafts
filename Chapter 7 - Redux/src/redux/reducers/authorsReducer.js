import initialState from '../store/initialState';
import actions from '../actionTypes/actionTypes';

const authorsReducer = (state = initialState.authors, action) => {
  switch(action.type) {
    case actions.GET_AUTHORS:
      return action.data;

    default:
      return state;
  }

};

export default authorsReducer;
