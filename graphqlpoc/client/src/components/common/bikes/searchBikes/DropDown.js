import React, { Component } from "react";
import { Link } from "react-router-dom";
import aaron from "../../../../image/aaron.jpg";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

export default class DropDown extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <Dropdown
        style={{ marginTop: "-30px" }}
        isOpen={this.state.dropdownOpen}
        onMouseEnter={this.toggle}
      >
        <img
          className="rounded-circle"
          style={{
            marginTop: "0px",
            marginRight: "0px",
            height: "30px",
            width: "30px",
            boarderColor: "white"
          }}
          src={aaron}
        />
        <DropdownToggle
          style={{ backgroundColor: "transparent", border: "none" }}
          caret
        />

        <DropdownMenu>
          <DropdownItem>
            <Link to="/list-your-bike">List A Bike </Link>
          </DropdownItem>
          <DropdownItem>Another Action</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Another Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
