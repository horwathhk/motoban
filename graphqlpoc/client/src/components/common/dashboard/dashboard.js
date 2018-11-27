import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";
import classnames from "classnames";
import { getCurrentUserQuery } from "../../../queries/queries";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
      // errors: {
      //   username: false,
      //   password: false
      // },
      // touched: {
      //   username: false,
      //   password: false
      // }
    };
  }

  componentDidUpdate() {
    let currentUser = this.props.getCurrentUserQuery.currentUser;
    let userName = currentUser.username;
    console.log(currentUser.username);
    if (this.state.username === "") {
      this.setState({ username: userName });
    } else {
      return this.state.username;
    }
  }
  //   // let user;
  //   // let userName;
  //   // console.log("data from dashboard");
  //   // user = this.props.getCurrentUserQuery.currentUser;
  //   // console.log("from dashboard");
  //   // console.log(user);
  //   // userName = user.username;
  //   // console.log(userName);
  //   // this.setState({ username: userName });
  // }

  render() {
    let { username } = this.state;

    // let currentUser = this.props.getCurrentUserQuery.currentUser;
    // console.log(currentUser);
    return (
      <div>
        <h1>{username}'s Dashboard</h1>
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
