import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";
import { ApolloLink } from "apollo-link";

class DropDown extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

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
        <DropdownToggle
          style={{ backgroundColor: "transparent", border: "none" }}
          caret
        >
          More
        </DropdownToggle>

        <DropdownMenu right>
          <DropdownItem>
            <Link to="/my-profile-view">My Profile</Link>
          </DropdownItem>
          <DropdownItem>
            <Link to="/register-bike">List A Bike </Link>
          </DropdownItem>
          <DropdownItem>
            <Link to="/renter-registration-form">Become a Renter </Link>
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
            <Link
              onClick={function() {
                localStorage.clear();
              }}
              to="/"
            >
              logout
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}
export default withRouter(DropDown);
