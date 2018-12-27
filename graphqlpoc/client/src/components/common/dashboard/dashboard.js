import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";
import classnames from "classnames";
import { getCurrentUserQuery } from "../../../queries/queries";
import Tabs from "./Tabs";
import SearchBikes from "../bikes/searchBikes/SearchBikes";
import Sidebar from "./SideBar";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null
    };
  }

  //"working" code
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
        <SearchBikes />
        <Tabs />
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
