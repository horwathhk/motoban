import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import TextFieldGroup from "../edit-profile/TextFieldGroup";

const text = {
    color: "black",
    fontWeight: "bold"
  };
  
  const cardBody = {
    opacity: "0.9",
    width: "90%"
  };
  
  const title = {
    color: "black",
    marginBottom: "2rem"
  };

export default class SearchStoresCardSimple extends Component {
    constructor(props) {
        super(props);
        this.state = {
          from: "",
          to: ""
        };
    
        this.onChange = this.onChange.bind(this);
      }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
  
    render() {
    return (
    <div>
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
    )
  }
}