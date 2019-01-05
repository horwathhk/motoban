import React, { Component } from "react";
import { Link } from "react-router-dom";
import SigninModal from "../filters/SignInModal";
import RegisterModal from "../auth/RegisterModal";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";

const navBar = {
  marginTop: "-50px"
};

const items = {
  marginRight: "25px",
  backgroundColor: "transparent",
  border: "none"
};

const button = {
  backgroundColor: "transparent",
  border: "none",
  marginRight: "25px"
};

const lastItem = {
  marginRight: "0px"
};

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <nav style={navBar} className="navbar navbar-expand-sm navbar-dark mb-4">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav ml-md-auto">
              <li className="nav-item">
                <Button style={button} tag={Link} to="/home2">
                  Motorbikes for Rent
                </Button>
              </li>
              <li style={items} className="nav-item">
                <SigninModal history={this.props.history} />
              </li>
              <li style={items} className="nav-item">
                <RegisterModal history={this.props.history} />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
export default withRouter(Navbar);
