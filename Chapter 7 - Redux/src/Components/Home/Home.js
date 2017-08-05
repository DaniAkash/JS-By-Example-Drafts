import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostSummary from '../Common/PostSummary';
import ErrorMessage from '../Common/ErrorMessage';
import { connect } from 'react-redux';

import LoadingIndicator from '../Common/LoadingIndicator';

class Home extends Component {

  static propTypes = {
    posts: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
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
          this.props.posts.map(post => <PostSummary key={post.id} post={post} />)
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
