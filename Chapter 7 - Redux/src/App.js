import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "bootstrap/dist/css/bootstrap.min.css";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { NavLink, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './App.css';
import routes from './routes';
import Home from './Components/Home/Home';
import Post from './Components/Post/Post';
import AuthorList from './Components/Author/AuthorList';
import AuthorPosts from './Components/Author/AuthorPosts';
import NewPost from './Components/NewPost/NewPost';
import * as postActions from './redux/actions/postActions';
import * as authorActions from './redux/actions/authorActions';

class App extends Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    postActions: PropTypes.object.isRequired,
    authorActions: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  componentWillMount() {
    this.props.postActions.getAllPosts();
    this.props.authorActions.getAllAuthors();
    if(this.props.location.pathname === '/') {
      this.props.history.push(routes.home);
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
          <NavLink className={'navbar-brand'} to={routes.home}>Home</NavLink>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className={'nav-link'} activeClassName={'active'} to={routes.home}>Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={'nav-link'} activeClassName={'active'} to={routes.authors}>Authors</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className={'nav-link'} activeClassName={'active'} to={routes.newPost}>New Post</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <Route exact path={routes.home} component={Home} />
        <Route exact path={routes.post} component={Post} />
        <Route exact path={routes.authors} component={AuthorList} />
        <Route exact path={routes.author} component={AuthorPosts} />
        <Route exact path={routes.newPost} component={NewPost} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postActions: bindActionCreators(postActions, dispatch),
    authorActions: bindActionCreators(authorActions, dispatch),
  };
}
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
