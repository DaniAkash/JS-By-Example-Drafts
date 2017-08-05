import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import authorsReducer from './authorsReducer';

const rootReducer = combineReducers({
  posts: postsReducer,
  authors: authorsReducer,
});

export default rootReducer;
