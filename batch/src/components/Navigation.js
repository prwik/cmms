import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  //UncontrolledDropdown,
  //DropdownToggle,
  //DropdownMenu,
  //DropdownItem 
} from 'reactstrap';

export default class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <Navbar color="faded" light>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <NavbarBrand href="/" className="mr-auto">cmms App</NavbarBrand>
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href='/'>Sites</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/settings">Settings</NavLink>
              </NavItem>
              {
                !isAuthenticated() && (
              <NavItem>
                <NavLink
                  href="#"
                  onClick={this.login.bind(this)}
                  >Login</NavLink>
              </NavItem>
                  )
              }
              {
                isAuthenticated() && (
              <NavItem>
                <NavLink 
                  href="/"
                  onClick={this.logout.bind(this)}
                  >Logout</NavLink>
              </NavItem>
                  )
              }
            </Nav>
          </Collapse>

        </Navbar>
      </div>
    );

  }
}