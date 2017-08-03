import React, { Component } from 'react';
import apiCall from '../../services/api/apiCall';

class Home extends Component {

  constructor() {
    super();

    this.state = {
      posts: [],
      loading: true,
      hasError: false,
    };
  }

  componentWillMount() {
    this.setState({loading: true});
    apiCall('posts', {}, 'GET')
    .then(allPosts => {
      const posts = allPosts.posts;
      this.setState({posts, loading: false});
    })
    .catch(error => {
      this.setState({hasError: true, loading: false});
      console.error(error);
    });
  }

  render () {
    return (
      <h2>Post</h2>
    );
  }
}

export default Home;
