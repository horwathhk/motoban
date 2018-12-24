import React, { Component } from "react";
import Toggle from "react-bootstrap-toggle";

const button = {
  marginBottom: "25px",
  marginTop: "10px",
  border: "solid black"
};
export default class MapToggle extends Component {
  constructor() {
    super();
    this.state = { toggleActive: false };
    this.onToggle = this.onToggle.bind(this);
  }
  onToggle() {
    this.setState({ toggleActive: !this.state.toggleActive });
  }
  render() {
    return (
      <form>
        <Toggle
          onClick={this.onToggle}
          on={<h2>ON</h2>}
          off={<h2>OFF</h2>}
          active={this.state.toggleActive}
          style={button}
        />
      </form>
    );
  }
}
