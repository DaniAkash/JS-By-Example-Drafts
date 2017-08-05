import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import apiCall from '../../services/api/apiCall';
import routes from '../../routes';
import LoadingIndicator from '../Common/LoadingIndicator';

class AuthorList extends Component {
  constructor() {
    super();

    this.state = {
      authors: [],
      loading: true,
      hasError: false,
    };
  }

  componentWillMount() {
    this.setState({loading: true});
    apiCall(`authors`, {}, 'GET')
    .then(authors => {
      this.setState({authors, loading: false});
    })
    .catch(error => {
      this.setState({hasError: true, loading: false});
      console.error(error);
    });
  }

  render() {
    return(
      <div className={`container`}>
        <h2>Authors</h2>
        {
          this.state.loading
          ?
            <LoadingIndicator />
          :
            null
        }
        <ul className={`list-group`}>
          {
            this.state.authors.map((author, index) =>
              <li className={`list-group-item`} key={index}>
                <NavLink to={routes.author.replace(':authorname', author)}>{author}</NavLink>
              </li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default AuthorList;
