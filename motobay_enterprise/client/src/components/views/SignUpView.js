import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";
import classnames from "classnames";
import { getUsersQuery, addUserMutation } from "../../queries/queries";

//components
import TextFieldGroup from "../../components/end-user-facing/reusable/TextFieldGroup";

class SignUpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
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
    //NEED TO ADD DON'T ALLOW EMPTY PASSWORD
    if (info.includes(e.target.username.value)) {
      alert("doesn't work");
    } else {
      this.props.addUserMutation({
        variables: {
          username: this.state.username,
          password: this.state.password
        }
      });
      console.log("success!");
      this.props.history.push("/signin");
    }
  }
  render() {
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
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={e => this.setState({ password: e.target.value })}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
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
)(SignUpView);
