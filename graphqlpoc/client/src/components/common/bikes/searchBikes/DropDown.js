import React, { Component } from "react";
import { Link } from "react-router-dom";
import bike1 from "../../../../image/bike1.png";

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
      <Dropdown isOpen={this.state.dropdownOpen} onMouseEnter={this.toggle}>
        <DropdownToggle
          style={{ height: "80px", width: "80px" }}
          className="rounded-circle"
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
