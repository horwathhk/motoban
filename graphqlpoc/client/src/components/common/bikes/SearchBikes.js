import React, { Component } from "react";
import TextFieldGroup from "../../common/edit-profile/TextFieldGroup";
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
  color: "#66fcf1"
};

const navbar = {
  background: "#1f2833"
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
                  <Label style={{ color: "#66fcf1" }} for="where">
                    Where
                  </Label>
                  <Input
                    type="where"
                    name="where"
                    id="where"
                    placeholder="City"
                  />
                </FormGroup>
              </NavItem>
              <NavItem style={second}>
                <FormGroup>
                  <Label style={{ color: "#66fcf1" }} for="from">
                    From
                  </Label>
                  <Input type="date" name="from" id="from" placeholder="from" />
                </FormGroup>
              </NavItem>
              <NavItem style={third}>
                <FormGroup>
                  <Label style={{ color: "#66fcf1" }} for="until">
                    Until
                  </Label>
                  <Input
                    type="date"
                    name="until"
                    id="until"
                    placeholder="until"
                  />
                </FormGroup>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default SearchBikes;
