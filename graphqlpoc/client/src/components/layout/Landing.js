import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Button } from "reactstrap";

import TextFieldGroup from "../common/edit-profile/TextFieldGroup";
import Navbar from "./Navbar/Navbar";

const text = {
  color: "black",
  fontWeight: "bold"
};

const cardBody = {
  height: "29rem",
  width: "25rem",
  opacity: "0.9"
};

const title = {
  color: "black",
  marginBottom: "2rem"
};

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
      from: "",
      to: "",
      current: false,
      description: "",
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <Navbar />
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-left">
                <h1 className="display-3 mb-4">Motobay</h1>
                <p className="lead"> Effortless Motorbike Rentals</p>
                <div style={cardBody} class="card">
                  <div className="card-body">
                    <h5 style={title} class="card-title">
                      Find a Ride. Start Your Journey.
                    </h5>
                    <p style={text}>Where</p>
                    <TextFieldGroup
                      placeholder="Anywhere"
                      name="Where"
                      value={this.state.where}
                      onChange={this.onChange}
                      // error={errors.school}
                    />
                    <p style={text}>From</p>

                    <TextFieldGroup
                      name="from"
                      type="date"
                      value={this.state.from}
                      onChange={this.onChange}
                      // error={errors.from}
                    />
                    <p style={text}>To</p>
                    <TextFieldGroup
                      name="from"
                      type="date"
                      value={this.state.from}
                      onChange={this.onChange}
                      // error={errors.from}
                    />

                    <Link
                      style={{
                        backgroundColor: "gray",
                        width: "8rem",
                        color: "white"
                      }}
                      className="nav-link"
                      to="/home"
                    >
                      Search Bikes
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
