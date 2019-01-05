import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";
import TextFieldGroup from "../reusable/TextFieldGroup";
import { graphql, compose } from "react-apollo";
import {
  getUsersQuery,
  addUserMutation,
  signinMutation,
  getCurrentUserQuery
} from "../../../queries/queries";
const items = {
  marginRight: "25px",
  backgroundColor: "transparent",
  border: "none"
};

const link = {
  color: "white"
};

class RegisterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      username: "",
      password: ""
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
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
      <div>
        <Button style={items} onClick={this.toggle}>
          Register
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} />
          <ModalBody>
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
                        onChange={e =>
                          this.setState({ username: e.target.value })
                        }
                        // className={shouldMarkError("username") ? "error" : ""}
                        // onBlur={this.handleBlur("username")}
                        // error={errors.username}
                      />
                      <TextFieldGroup
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={e =>
                          this.setState({ password: e.target.value })
                        }
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
          </ModalBody>
          <ModalFooter>
            <Button>
              <Link style={link} className="nav-link" to="/dashboard">
                Signin
              </Link>
            </Button>

            <Button color="secondary" onClick={this.toggle}>
              Go Back
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default compose(
  graphql(getUsersQuery, { name: "getUsersQuery" }),
  graphql(addUserMutation, { name: "addUserMutation" }),
  graphql(getCurrentUserQuery, { name: "getCurrentUserQuery" })
)(RegisterModal);
