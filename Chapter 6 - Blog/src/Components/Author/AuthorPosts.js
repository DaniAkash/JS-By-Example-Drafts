import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import apiCall from '../../services/api/apiCall';
import PostSummary from '../Common/PostSummary';

class AuthorPosts extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }

  constructor() {
    super();

    this.state = {
      posts: [],
    };
  }

  componentWillMount() {
    apiCall(`author/${this.props.match.params.authorname}`, {}, 'GET')
    .then(posts => {
      this.setState({posts, loading: false});
    })
    .catch(error => {
      this.setState({hasError: true, loading: false});
      console.error(error);
    });
  }

  render() {
    return(
      <div>
        {
          this.state.posts.map(post => <PostSummary key={post.id} post={post}>Post</PostSummary>)
        }
      </div>
    );
  }
}

export default withRouter(AuthorPosts);
