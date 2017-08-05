import initialState from '../store/initialState';
import actions from '../actionTypes/actionTypes';

const postsReducer = (state = initialState.posts, action) => {
  switch(action.type) {
    case actions.GET_POSTS:
      return action.data;
  }

  return state;
};

export default postsReducer;
