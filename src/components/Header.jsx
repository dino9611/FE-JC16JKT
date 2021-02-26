import React, { Component } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link, NavLink as LinkRouter } from "react-router-dom";

class Header extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand>
          <Link to="/">CRUD</Link>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              {/* <Link to="/about">About</Link> */}
              {/* <NavLink onClick={() => this.props.pindahpage("/about")}>
                About
              </NavLink> */}
              <LinkRouter to="/corona" className="mx-2">
                CORONA
              </LinkRouter>
            </NavItem>
            <NavItem>
              <Link to="/about" className="mx-2">
                About
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/home2" className="mx-2">
                Home2
              </Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem>Option 2</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>LogOut</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Header;
