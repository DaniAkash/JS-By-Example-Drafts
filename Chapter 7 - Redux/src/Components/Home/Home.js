import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostSummary from '../Common/PostSummary';
import ErrorMessage from '../Common/ErrorMessage';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import apiCall from '../../services/api/apiCall';
import LoadingIndicator from '../Common/LoadingIndicator';
import * as postActions from '../../redux/actions/postActions';

class Home extends Component {

  static propTypes = {
    posts: PropTypes.array.isRequired,
    postActions: PropTypes.object.isRequired,
  }

  constructor() {
    super();

    this.state = {
      posts: [],
      loading: false,
      hasError: false,
    };
  }

  componentWillMount() {
    this.props.postActions.getAllPosts();
  }

  render () {
    return (
      <div className={`posts-container container`}>
        {
          this.state.loading
          ?
            <LoadingIndicator />
          :
            null
        }
        {
          this.state.hasError
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postActions: bindActionCreators(postActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
