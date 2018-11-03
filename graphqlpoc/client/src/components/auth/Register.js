import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";
import classnames from "classnames";
import { getUsersQuery, addUserMutation } from "../../queries/queries";

//components
import TextFieldGroup from "../common/edit-profile/TextFieldGroup";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errors: {
        username: false,
        password: false
      },
      touched: {
        username: false,
        password: false
      }
    };
  }

  submitForm(e) {
    e.preventDefault();
    //submit with verification by checking state
    let data = this.props.getUsersQuery.users;
    let info = data.map(user => {
      return user.username;
    });
    console.log("target" + e.target.username.value);
    console.log(info);

    if (info.includes(e.target.username.value)) {
      alert("doesn't work");
    } else {
      this.props.history.push("/dashboard");
    }
  }

  validate(username, password) {
    // true means invalid, so our conditions got reversed
    return {
      username: username.length === 0,
      password: password.length === 0
    };
  }
  handleBlur = field => evt => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };
  render() {
    //ononchange is fired every keystroke

    const errors = this.validate(this.state.username, this.state.password);

    const shouldMarkError = field => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];
      return hasError ? shouldShow : false;
    };

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create an Account</h1>
              <p className="lead text-center">
                Create an Account to Post or Rent a Motorbike
              </p>
              <form id="add-user" onSubmit={this.submitForm.bind(this)}>
                <TextFieldGroup
                  placeholder="Username"
                  name="username"
                  type="username"
                  onChange={e => this.setState({ username: e.target.value })}
                  className={shouldMarkError("username") ? "error" : ""}
                  onBlur={this.handleBlur("username")}
                  error={errors.username}
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={e => this.setState({ password: e.target.value })}
                  error={errors.password}
                  className={shouldMarkError("password") ? "error" : ""}
                  onBlur={this.handleBlur("password")}
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
  graphql(addUserMutation, { name: "addUserMutation" })
)(Register);

{
  /* <form id="add-user" onSubmit={this.submitForm.bind(this)}>
  <div className="field">
    <label>Username</label>
    <input
      type="text"
      onChange={e => this.setState({ username: e.target.value })}
    />
  </div>

  <div className="field">
    <label>Password</label>
    <input
      type="text"
      onChange={e => this.setState({ password: e.target.value })}
    />
  </div>
  <button>Submit</button>
</form>; */
}
