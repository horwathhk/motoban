import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";
import classnames from "classnames";
import { getCurrentUserQuery } from "../../queries/queries";
import SearchBikes from "../end-user-facing/bikes/SearchBikesCard";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null
    };
  }

  componentDidUpdate() {
    let currentUser = this.props.getCurrentUserQuery.currentUser;
    console.log(currentUser);
    let userName = currentUser.username;
    console.log(currentUser.username);
    let id = currentUser.user_id + currentUser.user_id;
    console.log(id);
    if (this.state.username === null) {
      this.setState({ username: userName }, function() {
        console.log("state changed in dash!");
        console.log(this.state.username);
      });
    } else {
      return this.state.username;
    }
  }
  render() {
    let currentUser = this.props.getCurrentUserQuery.currentUser;
    console.log(currentUser);

    let { username } = this.state;
    return (
      <div>
        <h1>Hi {username}!</h1>
      </div>
    );
  }
}
// export default Dashboard;
export default compose(
  graphql(
    getCurrentUserQuery,
    { name: "getCurrentUserQuery" },
    { options: { fetchPolicy: "network-only" } }
  )
)(Dashboard);
