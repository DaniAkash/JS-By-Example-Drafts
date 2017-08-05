import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostSummary from '../Common/PostSummary';
import ErrorMessage from '../Common/ErrorMessage';
import { connect } from 'react-redux';

import LoadingIndicator from '../Common/LoadingIndicator';

class Home extends Component {

  static propTypes = {
    posts: PropTypes.array.isRequired,
  }

  render () {
    return (
      <div className={`posts-container container`}>
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
            <ErrorMessage title={'Error!'} message={'Unable to retrieve posts!'} />
          :
            null
        }
        {
          this.props.posts.map(post => <PostSummary key={post.id} post={post}>Post</PostSummary>)
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    loading: state.ajaxCalls.getAllPosts.loading,
    hasError: state.ajaxCalls.getAllPosts.hasError,
  };
}

export default connect(
  mapStateToProps
)(Home);
