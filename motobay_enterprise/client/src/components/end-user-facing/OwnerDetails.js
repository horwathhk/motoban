import React, { Component } from "react";
import { getBikeQuery } from "../../../queries/queries";
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

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col">
              <strong>Owned By</strong>
            </div>
            <div className="col">{this.props.username}</div>
            <div className="w-100" />
            <div className="col">
              <strong>Email</strong>
            </div>
            <div className="col">{this.props.email}</div>
          </div>
        </div>
      </div>
    );
  }
}
export default OwnerDetails;
