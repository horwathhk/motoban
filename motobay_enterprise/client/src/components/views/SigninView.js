import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getUsersQuery,
  addUserMutation,
  signinMutation,
  getCurrentUserQuery
} from "../queries/queries";
import { Collapse, Navbar, NavbarToggler, NavbarBrand } from "reactstrap";

//components
import TextFieldGroup from "../components/common/edit-profile/TextFieldGroup";

class SigninView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      username: "",
      password: ""
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
                  />
                  <TextFieldGroup
                    placeholder="Password"
                    name="password"
                    type="password"
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                  <input
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
)(SigninView);
