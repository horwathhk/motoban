import React, { Component } from "react";
import TextFieldGroup from "../../edit-profile/TextFieldGroup";
import DropDown from "./DropDown";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

const text = {
  color: "#f6ffec"
};

const navbar = {
  background: "#76a2b2"
};

const first = {
  marginRight: "2rem",
  marginLeft: "5rem",
  marginTop: "13px",
  width: "15rem"
};

const second = {
  marginRight: "2rem",
  marginLeft: "2rem",
  marginTop: "13px",
  width: "15rem"
};

const third = {
  marginRight: "2rem",
  marginLeft: "2rem",
  marginTop: "13px",
  width: "15rem"
};

const dropDown = {
  marginLeft: "20rem",
  marginTop: "35px"
};

class SearchBikes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      where: "",
      from: "",
      to: ""
    };
  }

  render() {
    return (
      <div>
        <Navbar style={navbar} light expand="md">
          <NavbarBrand style={text} href="/">
            Motoban
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem style={first}>
                <FormGroup>
                  <Label style={{ color: "#f6ffec" }} for="where">
                    Where
                  </Label>
                  <input
                    class="form-control form-control-sm"
                    type="text"
                    placeholder="where"
                  />
                </FormGroup>
              </NavItem>
              <NavItem style={second}>
                <FormGroup>
                  <Label style={{ color: "#f6ffec" }} for="from">
                    From
                  </Label>
                  <input
                    class="form-control form-control-sm"
                    type="date"
                    placeholder="from"
                  />
                </FormGroup>
              </NavItem>
              <NavItem style={third}>
                <FormGroup>
                  <Label style={{ color: "#f6ffec" }} for="until">
                    Until
                  </Label>
                  <input
                    class="form-control form-control-sm"
                    type="date"
                    placeholder="until"
                  />
                </FormGroup>
              </NavItem>
              <NavItem style={dropDown}>
                <DropDown />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default SearchBikes;
