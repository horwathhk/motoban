import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";
import { getUsersQuery, addUserMutation } from "../../queries/queries";

//components
import TextFieldGroup from "../common/edit-profile/TextFieldGroup";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  submitForm(e) {
    // let i;
    // let info = this.props.addUserMutation;
    let data = this.props.getUsersQuery;
    e.preventDefault();
    // console.log(this.state);

    data.users.map(user => {
      if (user.username === e.target.username.value) {
        console.log("match");
        console.log(e.target.value);
        return false;
      } else {
        console.log("no match");
        console.log(e.target.value);

        this.props.addUserMutation({
          variables: {
            username: this.state.username,
            password: this.state.password
          }
        });
      }
      this.props.history.push("/dashboard");

      // console.log("mapping" + user.username);

      //verification
      // for (i = 0; i < data.users.length; i++) {
      //   if (!info.username) {
      //     //add danger class
      //     console.log("nope!");
      //   } else {
      //     console.log("mutation" + info.username);
      //     console.log("query" + data.users.username);
      //   }
      // }
    });
  }
  render() {
    console.log(this.props);
    //ononchange is fired every keystroke
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Register</h1>
              <p className="lead text-center">
                Create an Account to Post or Rent a Motorbike
              </p>
              <form id="add-user" onSubmit={this.submitForm.bind(this)}>
                <TextFieldGroup
                  placeholder="Username"
                  name="username"
                  type="username"
                  // onChange={e => this.setState({ username: e.target.value })}
                  onChange={e => this.setState({ username: e.target.value })}
                  // error={errors.email}
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  onChange={e => this.setState({ password: e.target.value })}
                  // error={errors.email}
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
