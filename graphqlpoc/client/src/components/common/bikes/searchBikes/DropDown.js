import React, { Component } from "react";
import { Link } from "react-router-dom";
import aaron from "../../../../image/aaron.jpg";
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

  // logout = e => {
  //   localStorage.clear();
  //   this.props.history.push("/");
  // };

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
            <Link to="/dashboard">My Profile</Link>
          </DropdownItem>
          <DropdownItem>
            <Link to="/list-your-bike">List A Bike </Link>
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
