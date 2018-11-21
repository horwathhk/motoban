//https://www.youtube.com/watch?v=-VgeUqpPTh4&index=10&list=PLN3n1USn4xlkdRlq3VZ1sT6SGW0-yajjL
//https://www.youtube.com/watch?v=07uyIZMqgJM
//https://www.youtube.com/watch?v=7C3rPbXmm44
// https://www.udemy.com/mern-stack-front-to-back/learn/v4/t/lecture/10055368?start=7 private route traversey

import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";
import classnames from "classnames";
import {
  getUsersQuery,
  addUserMutation,
  signinMutation,
  getCurrentUserQuery
} from "../../queries/queries";

//components
import TextFieldGroup from "../common/edit-profile/TextFieldGroup";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    console.log(this.props.getCurrentUserQuery);

    this.props.history.push("/dashboard");
  };

  //ccheck skype I sent a screenshot of the object we are getting
  // console.log(response);
  // localStorage.setItem("token", token);
  // this.props.history.push("/dashboard");

  // validate(username, password) {
  //   // true means invalid, so our conditions got reversed
  //   return {
  //     username: username.length === 0,
  //     password: password.length === 0
  //   };
  // }
  // handleBlur = field => evt => {
  //   this.setState({
  //     touched: { ...this.state.touched, [field]: true }
  //   });
  // };
  render() {
    //ononchange is fired every keystroke

    // const errors = this.validate(this.state.username, this.state.password);

    // const shouldMarkError = field => {
    //   const hasError = errors[field];
    //   const shouldShow = this.state.touched[field];
    //   return hasError ? shouldShow : false;
    // };

    return (
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
    );
  }
}

export default compose(
  graphql(getUsersQuery, { name: "getUsersQuery" }),
  graphql(signinMutation, { name: "signinMutation" }),
  graphql(addUserMutation, { name: "addUserMutation" }),
  graphql(getCurrentUserQuery, { name: "getCurrentUserQuery" })
)(Signin);
