import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../reusable/TextFieldGroup";
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

class SigninModal extends React.Component {
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
  submitForm = async e => {
    e.preventDefault();
    const { username, password } = this.state;
    const response = await this.props.signinMutation({
      variables: { username, password }
    });
    console.log(response);
    const { token } = response.data.signin;
    localStorage.setItem("token", token);
    this.props.history.push("/my-profile-view");
  };

  render() {
    return (
      <div>
        <Button style={items} onClick={this.toggle}>
          Signin
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
                    <h1 className="display-4 text-center">Signin</h1>
                    <form id="add-user" onSubmit={this.submitForm.bind(this)}>
                      <TextFieldGroup
                        placeholder="Username"
                        name="username"
                        type="username"
                        onChange={e =>
                          this.setState({ username: e.target.value })
                        }
                      />
                      <TextFieldGroup
                        placeholder="Password"
                        name="password"
                        type="password"
                        onChange={e =>
                          this.setState({ password: e.target.value })
                        }
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
        </Modal>
      </div>
    );
  }
}

export default compose(
  graphql(getUsersQuery, { name: "getUsersQuery" }),
  graphql(signinMutation, { name: "signinMutation" }),
  graphql(addUserMutation, { name: "addUserMutation" }),
  graphql(getCurrentUserQuery, { name: "getCurrentUserQuery" })
)(SigninModal);
