import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBikes from "../bikes/SearchBikesCard";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import {
  getCurrentUserQuery,
  addRenterMutation,
  addRenterDetailsMutation
} from "../../../queries/queries";
import { graphql, compose } from "react-apollo";

class RenterRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users_id_fkey: null,
      renters_id_fkey: null,
      renter_email: "",
      renter_country: ""
    };
  }

  submitForm = async e => {
    e.preventDefault();
    console.log("form woking");
    let { users_id_fkey, renters_id_fkey } = this.state;

    const registerRenter = await this.props.addRenterMutation({
      variables: { users_id_fkey }
    });

    console.log(registerRenter);
    let renterID = Number(registerRenter.data.addRenter.renters_id);
    if (renters_id_fkey === null) {
      this.setState({ renters_id_fkey: renterID }, function() {
        let { renters_id_fkey, renter_email, renter_country } = this.state;
        const renterDetails = this.props.addRenterDetailsMutation({
          variables: {
            renters_id_fkey,
            renter_email,
            renter_country
          }
        });
        this.props.history.push({
          pathname: "/store-registration-home-page",
          state: { renters_id_fkey: this.state.renters_id_fkey }
        });
      });
    }
  };
  componentDidUpdate() {
    let currentUser = this.props.getCurrentUserQuery.currentUser;
    let userID = Number(currentUser.users_id);
    if (this.state.users_id_fkey === null)
      this.setState({ users_id_fkey: userID }, function() {
        console.log(this.state.users_id);
      });
  }

  render() {
    // let currentUser = this.props.getCurrentUserQuery.currentUser;
    // console.log(currentUser);
    console.log("fkey");
    console.log(this.state.users_id_fkey);
    return (
      <div>
        <SearchBikes />
        <div className="row">
          <div className="col-md-5 m-auto">
            <br />
            <h1 className="display-4 text-center">Register as A Renter</h1>
            <p className="text-center">
              Before you can rent a bike, please register as a Motobay Renter by
              providing a bit of information about yourself below.
            </p>
            <Form onSubmit={this.submitForm.bind(this)}>
              <FormGroup>
                <Label id="exampleFormControlInput1">Email</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  onChange={e =>
                    this.setState({ renter_email: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup className="form-group">
                <Label for="exampleFormControlInput1">Country</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="country"
                  placeholder="Please write in the country you will be a renter in."
                  onChange={e =>
                    this.setState({ renter_country: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Input
                  // disabled={!isEnabled}
                  type="submit"
                  classNameName="btn btn-info btn-block mt-4"
                />
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default compose(
  graphql(
    getCurrentUserQuery,
    { name: "getCurrentUserQuery" },
    { options: { fetchPolicy: "network-only" } }
  ),
  graphql(addRenterMutation, { name: "addRenterMutation" }),
  graphql(addRenterDetailsMutation, { name: "addRenterDetailsMutation" })
)(RenterRegistration);
