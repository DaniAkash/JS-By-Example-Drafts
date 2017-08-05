import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class NewPost extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  }

  constructor() {
    super();

    this.state = {
      author: '',
      post: '',
    };
  }

  render() {
    return(
      <div>Write Post</div>
    );
  }
}

export default withRouter(NewPost);
