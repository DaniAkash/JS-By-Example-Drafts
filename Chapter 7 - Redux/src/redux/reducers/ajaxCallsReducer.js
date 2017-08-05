import initialState from '../store/initialState';
import actions from '../actionTypes/actionTypes';

const ajaxCallsReducer = (state = initialState.ajaxCalls, action) => {
  switch(action.type) {

    case actions.GET_POSTS_AJAX_CALL_START:
      Object.assign(
        state,
        {
          getAllPosts: {
            isLoading: true,
            hasError: false,
          },
        }
      );

    case actions.GET_POSTS_AJAX_CALL_SUCCESS:
      Object.assign(
        state,
        {
          getAllPosts: {
            isLoading: false,
            hasError: false,
          },
        }
      );


    case actions.GET_POSTS_AJAX_CALL_FAILURE:
      Object.assign(
        state,
        {
          getAllPosts: {
            isLoading: false,
            hasError: true,
          },
        }
      );


    case actions.GET_AUTHORS_AJAX_CALL_START:
      Object.assign(
        state,
        {
          getAuthors: {
            isLoading: true,
            hasError: false,
          },
        }
      );

    case actions.GET_AUTHORS_AJAX_CALL_SUCCESS:
      Object.assign(
        state,
        {
          getAuthors: {
            isLoading: false,
            hasError: false,
          },
        }
      );

    case actions.GET_AUTHORS_AJAX_CALL_FAILURE:
      Object.assign(
        state,
        {
          getAuthors: {
            isLoading: false,
            hasError: true,
          },
        }
      );

    // case actions.ADD_POST_AJAX_CALL_START:

    // case actions.ADD_POST_AJAX_CALL_SUCCESS:

    // case actions.ADD_POST_AJAX_CALL_FAILURE:
  }
  return state;
};

export default ajaxCallsReducer;
