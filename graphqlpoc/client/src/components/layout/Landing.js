import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/edit-profile/TextFieldGroup";

const cardBody = {
  height: "35rem"
};

const title = {
  color: "black"
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
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-left">
                <h1 className="display-3 mb-4">Motoban</h1>
                <p className="lead"> Bring On The Open Road.</p>
                <div style={cardBody} class="card w-50">
                  <div class="card-body">
                    <h5 style={title} class="card-title">
                      Find a Ride. Start Your Journey.
                    </h5>
                    <h4>Where</h4>
                    <TextFieldGroup
                      placeholder="Where"
                      name="Where"
                      value={this.state.where}
                      onChange={this.onChange}
                      // error={errors.school}
                    />
                    <h4>From</h4>
                    <TextFieldGroup
                      name="from"
                      type="date"
                      value={this.state.from}
                      onChange={this.onChange}
                      // error={errors.from}
                    />
                    <h4>To</h4>
                    <TextFieldGroup
                      name="from"
                      type="date"
                      value={this.state.from}
                      onChange={this.onChange}
                      // error={errors.from}
                    />
                    <a href="#" class="btn btn-secondary">
                      Button
                    </a>
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
