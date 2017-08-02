import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { NavLink, Route } from 'react-router-dom';

import './App.css';
import routes from './routes';
import Home from './Components/Home/Home';

class App extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
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
      </div>
    );
  }
}

export default App;
