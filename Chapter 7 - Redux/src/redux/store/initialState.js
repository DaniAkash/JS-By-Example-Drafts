const initialState = {
  posts: [

  ],
  authors: [

  ],
  ajaxCalls: {
    getAllPosts: {
      isLoading: false,
      hasError: false,
    },
    getAuthors: {
      isLoading: false,
      hasError: false,
    },
    addPost: {
      isLoading: false,
      hasError: false,
    }
  }
};

export default initialState;
