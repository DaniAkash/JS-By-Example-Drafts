import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid/v4';

import apiCall from '../../services/api/apiCall';

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
      title: '',
      content: '',
      noOfLines: 0,
      loading: false,
    };
    this.editAuthorName = this.editAuthorName.bind(this);
    this.editContent = this.editContent.bind(this);
    this.submit = this.submit.bind(this);
  }

  editAuthorName(event) {
    this.setState({author: event.target.value});
  }

  editContent(event) {
    const linesArray = event.target.value.split('\n');
    this.setState({content: event.target.value, noOfLines: linesArray.length});
  }

  editTitle(event) {
    this.setState({title: event.target.value});
  }

  submit() {
    this.setState({loading: true});
    if(this.state.author && this.state.content && this.state.title) {
      const date = new Date();
      const epoch = (date.getTime()/1000).toFixed(0).toString();
      const body = {
        id: uuidv4(),
        author: this.state.author,
        title: this.state.title,
        content: this.state.content,
        datetime: epoch,
        comments: [],
      };
      apiCall(`post`, body)
      .then(success => {

        this.setState({posts, loading: false});
      })
      .catch(error => {
        this.setState({hasError: true, loading: false});
        console.error(error);
      });
    } else {

    }
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
        <div className="form-group title-input">
          <label htmlFor="title">Title:</label>
          <input type="text" className="form-control" id="title" value={this.state.title} onChange={this.editTitle}/>
        </div>
        <div className="form-group content-text-area">
          <label htmlFor="content">Post:</label>
          <textarea className="form-control" rows={noOfLines} id="content" value={this.state.content} onChange={this.editContent}></textarea>
        </div>
        <button type="button" className="btn btn-primary" onClick={this.submit}>Submit Post</button>
      </div>
    );
  }
}

export default withRouter(NewPost);
