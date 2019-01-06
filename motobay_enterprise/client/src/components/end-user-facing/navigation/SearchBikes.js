import React, { Component } from "react";
import TextFieldGroup from "../reusable/TextFieldGroup";
import DropDown from "../navigation/DropDown";
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
  Col,
  Row
} from "reactstrap";

const text = {
  color: "#f6ffec",
  marginTop: "-30"
};

const navbar = {
  background: "#200e1c",
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
  marginLeft: "10%",
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
      <div className="col-md-12">
        <Navbar style={navbar} light expand="md">
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavbarBrand row style={text} href="/">
                Motobay
              </NavbarBrand>
              <NavItem style={first}>
                <FormGroup row>
                  <Label sm={2} style={{ color: "#f6ffec" }} for="where">
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
                  <Label sm={2} style={{ color: "#f6ffec" }} for="from">
                    From
                  </Label>
                  <Col sm={10}>
                    <input
                      style={{
                        border: "0",
                        outline: "0",
                        background: "transparent",
                        borderBottom: "1px solid #f6ffec",
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
                  <Label sm={2} style={{ color: "#f6ffec" }} for="until">
                    Until
                  </Label>
                  <Col sm={10}>
                    <input
                      style={{
                        border: "0",
                        outline: "0",
                        background: "transparent",
                        borderBottom: "1px solid #f6ffec "
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
