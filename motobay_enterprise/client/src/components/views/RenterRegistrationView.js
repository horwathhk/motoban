import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBikes from "../end-user-facing/bikes/SearchBikesCard";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Row,
  Col
} from "reactstrap";

const jumbotron = {
  backgroundSize: "cover"
};

class RenterRegistrationHomePage extends Component {
  render() {
    return (
      <div>
        <div>
          <div>
            <SearchBikes />
          </div>
          <div class="jumbotron">
            <h1 class="display-4 text-center">Become A Motobay Renter</h1>
            <p class="lead text-center">
              Become a renter. Set up a motorbike shop. Start renting. All in
              under 10 minutes.
            </p>
            <p class="lead text-center">
              <Button tag={Link} to="/renter-registration">
                Become a Renter
              </Button>
            </p>
          </div>
          <h1 class="display-4 text-center">
            We can put FAQ, renter testimonials, and other stuff here
          </h1>
        </div>
      </div>
    );
  }
}
export default RenterRegistrationHomePage;
