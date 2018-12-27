import React, { Component } from "react";
import { getBikeQuery } from "../../../../queries/queries";
import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";
class OwnerDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    let bike = nextProps.data.bike;
    console.log(bike);
    this.setState(
      {
        email: bike.email,
        username: bike.username
      },
      function() {
        console.log(this.state.email);
      }
    );
  }

  render() {
    let { email, username } = this.state;
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col">
              <strong>Owned By</strong>
            </div>
            <div className="col">{username}</div>
            <div className="w-100" />
            <div className="col">
              <strong>Email</strong>
            </div>
            <div className="col">{email}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default graphql(getBikeQuery, {
  options: props => ({ variables: { bikes_id_fkey: props.bikeID } })
})(OwnerDetails);
