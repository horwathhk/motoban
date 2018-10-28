import React, { Component } from "react";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      n
    };
  }

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <h1 className="display-4 text-center">Sign Up</h1>
            <p classname="lead text-center">Create a Motoban Account</p>
            <form no Validate onSubmit={onSubmit}>
              <TextFieldGroup
                placeholder="Name"
                name="Name"
                value={this.state.name}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
