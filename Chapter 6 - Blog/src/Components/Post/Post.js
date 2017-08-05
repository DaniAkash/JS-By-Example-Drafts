import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import apiCall from '../../services/api/apiCall';
import LoadingIndicator from '../Common/LoadingIndicator';

class Post extends Component {
  constructor() {
    super();

    this.state = {
      post: {},
      loading: true,
      hasError: false,
    };
  }

  componentWillMount() {
    this.setState({loading: true});
    apiCall(`post/${this.props.match.params.id}`, {}, 'GET')
    .then(post => {
      this.setState({post, loading: false});
    })
    .catch(error => {
      this.setState({hasError: true, loading: false});
      console.error(error);
    });
  }

  render() {
    return(
      <div className={`post-container container`}>
        {
          this.state.loading
          ?
            <LoadingIndicator />
          :
            null
        }
        <h2>{this.state.post.title}</h2>
        <p>{this.state.post.author}</p>
        <p>{this.state.post.content}</p>
      </div>
    );
  }
}

export default withRouter(Post);
