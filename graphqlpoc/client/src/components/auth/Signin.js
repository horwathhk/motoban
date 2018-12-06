import React, { Component } from "react";
import { Link } from "react-router-dom";
import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";
import classnames from "classnames";
import {
  getUsersQuery,
  addUserMutation,
  signinMutation,
  getCurrentUserQuery
} from "../../queries/queries";
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
  DropdownItem
} from "reactstrap";

//components
import TextFieldGroup from "../common/edit-profile/TextFieldGroup";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      username: "",
      password: ""
      // errors: {
      //   username: false,
      //   password: false
      // },
      // touched: {
      //   username: false,
      //   password: false
      // }
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  submitForm = async e => {
    e.preventDefault();
    const { username, password } = this.state;
    const response = await this.props.signinMutation({
      variables: { username, password }
    });
    console.log(response);
    const { token } = response.data.signin;
    localStorage.setItem("token", token);
    this.props.history.push("/dashboard");
  };
  render() {
    //ononchange is fired every keystroke

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Motobay</NavbarBrand>
          <NavbarToggler onclick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar />
        </Navbar>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Signin</h1>
                <form id="add-user" onSubmit={this.submitForm.bind(this)}>
                  <TextFieldGroup
                    placeholder="Username"
                    name="username"
                    type="username"
                    onChange={e => this.setState({ username: e.target.value })}
                    // className={shouldMarkError("username") ? "error" : ""}
                    // onBlur={this.handleBlur("username")}
                    // error={errors.username}
                  />
                  <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    onChange={e => this.setState({ password: e.target.value })}
                    // error={errors.password}
                    // className={shouldMarkError("password") ? "error" : ""}
                    // onBlur={this.handleBlur("password")}
                  />
                  <input
                    // disabled={!isEnabled}
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(getUsersQuery, { name: "getUsersQuery" }),
  graphql(signinMutation, { name: "signinMutation" }),
  graphql(addUserMutation, { name: "addUserMutation" }),
  graphql(getCurrentUserQuery, { name: "getCurrentUserQuery" })
)(Signin);
