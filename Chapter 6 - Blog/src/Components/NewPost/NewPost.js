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
      noOfLines: 0,
    };
    this.editAuthorName = this.editAuthorName.bind(this);
    this.editPost = this.editPost.bind(this);
  }

  editAuthorName(event) {
    this.setState({author: event.target.value});
  }

  editPost(event) {
    const linesArray = event.target.value.split('\n');
    this.setState({post: event.target.value, noOfLines: linesArray.length});
  }

  render() {

    const noOfLines = this.state.noOfLines < 5 ? 5 : this.state.noOfLines;

    return(
      <div className={'container'}>
        <h2>Write Post</h2>
        <div className="form-group author-name-input">
          <label htmlFor="author">Author Name:</label>
          <input type="text" className="form-control" id="author" value={this.state.author} onChange={this.editAuthorName}/>
        </div>
        <div className="form-group">
          <label htmlFor="post">Post:</label>
          <textarea className="form-control" rows={noOfLines} id="post" value={this.state.post} onChange={this.editPost}></textarea>
        </div>
        <button type="button" className="btn btn-primary">Submit Post</button>
      </div>
    );
  }
}

export default withRouter(NewPost);
