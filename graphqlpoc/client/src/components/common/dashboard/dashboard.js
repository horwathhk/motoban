import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";
import classnames from "classnames";
import { getCurrentUserQuery } from "../../../queries/queries";

class Dashboard extends Component {
  componentDidMount() {
    console.log(this.props.getCurrentUserQuery);
  }

  render() {
    return (
      <div>
        <h1> Dashboard </h1>
      </div>
    );
  }
}
// export default Dashboard;
export default compose(
  graphql(getCurrentUserQuery, { name: "getCurrentUserQuery" })
)(Dashboard);
