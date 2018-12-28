import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import SearchStoresCardSimple from "../common/resusable-components/SearchStoresCardSimple"

import TextFieldGroup from "../common/edit-profile/TextFieldGroup";
import Navbar from "./Navbar/Navbar";

export default class Landing extends Component {
 
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
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 text-left">    
                <SearchStoresCardSimple/>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
