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
  Input,
  Col
} from "reactstrap";

const text = {
  color: "#d1c879",
  marginTop: "-30"
};

const navbar = {
  background: "#3b2722",
  width: "100%"
};

const first = {
  marginRight: "2rem",
  marginLeft: "5rem",

  width: "15rem"
};

const second = {
  marginRight: "2rem",
  marginLeft: "2rem",

  width: "15rem"
};

const third = {
  marginRight: "2rem",
  marginLeft: "2rem",
  width: "15rem"
};

const dropDown = {
  marginLeft: "20rem",
  marginTop: "30px"
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
      <div style={{ backgroundColor: "#f6ffec" }}>
        <Navbar style={navbar} light expand="md">
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavbarBrand row style={text} href="/">
                Motoban
              </NavbarBrand>
              <NavItem style={first}>
                <FormGroup row>
                  <Label sm={2} style={{ color: "#d1c879" }} for="where">
                    Where
                  </Label>
                  <Col sm={10}>
                    <input
                      style={{
                        border: "0",
                        outline: "0",
                        background: "transparent",
                        borderBottom: "1px solid #f6ffec"
                      }}
                      class="form-control form-control-sm"
                      type="text"
                      placeholder="Enter a City"
                    />
                  </Col>
                </FormGroup>
              </NavItem>
              <NavItem style={second}>
                <FormGroup row>
                  <Label sm={2} style={{ color: "#d1c879" }} for="from">
                    From
                  </Label>
                  <Col sm={10}>
                    <input
                      style={{
                        border: "0",
                        outline: "0",
                        background: "transparent",
                        borderBottom: "1px solid #d1c879",
                        color: "#f6ffrc"
                      }}
                      class="form-control form-control-sm"
                      type="date"
                      placeholder="from"
                    />
                  </Col>
                </FormGroup>
              </NavItem>
              <NavItem style={third}>
                <FormGroup row>
                  <Label sm={2} style={{ color: "#d1c879" }} for="until">
                    Until
                  </Label>
                  <Col sm={10}>
                    <input
                      style={{
                        border: "0",
                        outline: "0",
                        background: "transparent",
                        borderBottom: "1px solid #d1c879"
                      }}
                      class="form-control form-control-sm"
                      type="date"
                      placeholder="until"
                    />
                  </Col>
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
