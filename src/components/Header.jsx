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
import { connect } from "react-redux";
class Header extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand>
          <Link to="/">{this.props.Bebas}</Link>
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
                {this.props.DataUser.username
                  ? this.props.DataUser.username
                  : "blm log"}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Option 1</DropdownItem>
                <DropdownItem></DropdownItem>
                <DropdownItem divider />
                {this.props.DataUser.islogin ? (
                  <DropdownItem>Logout</DropdownItem>
                ) : (
                  <Link to="/login">
                    <DropdownItem>Login</DropdownItem>
                  </Link>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}
const MapStatetoProps = (state) => {
  return {
    Bebas: state.Angka,
    DataUser: state.User,
  };
};
export default connect(MapStatetoProps)(Header);
