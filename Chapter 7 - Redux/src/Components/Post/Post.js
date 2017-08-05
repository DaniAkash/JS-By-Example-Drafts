import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ErrorMessage from '../Common/ErrorMessage';
import LoadingIndicator from '../Common/LoadingIndicator';

class Post extends Component {

  static propTypes = {
    post: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
  }

  render() {
    return(
      <div className={`post-container container`}>
        {
          this.props.loading
          ?
            <LoadingIndicator />
          :
            null
        }
        {
          this.props.hasError
          ?
            <ErrorMessage title={'Error!'} message={`Unable to retrieve post!`} />
          :
            null
        }
        {
          this.props.post
          ?
            <div>
              <h2>{this.props.post.title}</h2>
              <p>{this.props.post.author}</p>
              <p>{this.props.post.content}</p>
            </div>
          :
            null
        }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {

  const findPost = (post) => {
    return post.id === ownProps.match.params.id;
  };

  return {
    post: state.posts.find(findPost),
    loading: state.ajaxCalls.getAllPosts.loading,
    hasError: state.ajaxCalls.getAllPosts.hasError,
  };
}

export default withRouter(
  connect(mapStateToProps)(Post)
);
