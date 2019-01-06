import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getBikesOfStoreLimitTwoQuery } from "../../../queries/queries";
import FeaturedBikesCards from "./FeaturedBikesCards";

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
class FeaturedBikes extends Component {
  render() {
    let bikeItem;
    let bikes = this.props.data.bikesOfStoreLimitTwo;
    console.log("each stores bikes");

    if (bikes) {
      bikeItem = bikes.map(bike => (
        <FeaturedBikesCards key={bike.bike_id} bike={bike} />
      ));
    }
    return <Row class="col-sm-2">{bikeItem}</Row>;
  }
}

export default graphql(getBikesOfStoreLimitTwoQuery, {
  options: props => ({ variables: { store_id: props.storeID } })
})(FeaturedBikes);
