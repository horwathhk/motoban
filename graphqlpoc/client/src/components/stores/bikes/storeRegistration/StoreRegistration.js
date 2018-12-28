import React, { Component } from "react";

export default class StoreRegistration extends Component {
  componentWillMount() {
    console.log("component will mount");
    console.log(this.props.location.state.renters_id_fkey);
  }

  render() {
    return (
      <div>
        <h1>Hi!</h1>
      </div>
    );
  }
}
