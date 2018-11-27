import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
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
import { getBikesQuery } from "../../../queries/queries";
import BikeItem from "./BikeItem";

const container = {
  marginBottom: "30 rem",
  marginTop: "30rem"
};

const topRowBuffer = {
  marginTop: "5rem"
};

const float = {
  float: "left"
};

const row = {
  marginTop: "33px"
};

class Bikes extends Component {
  render() {
    let i;
    let bikeItems;
    let bikes = this.props.getBikesQuery.bikes;
    console.log(bikes);
    console.log(bikes);
    if (bikes) {
      bikeItems = bikes.map(bike => (
        <BikeItem key={bike.bike_id} bike={bike} />
      ));
    }
    console.log(bikeItems);
    // bikeItems = bikes.map(bike => <BikeItem key={bike.bike_id} bike={bike} />);
    // let bikeItems;
    // if (bikes === null /*||or loading*/) {
    //   /* bikeItems = </Spinner/>;*/
    // } else {
    //   if (bikes.length > 0) {
    //     bikeItems = bikes.map(bike => (
    //       <BikeItem key={bike.bike_id} bike={bike} />
    //     ));
    //   } else {
    //     bikeItems = <h4> No Profile Found ... </h4>;
    //   }

    // console.log(bikes[0].model);
    return <Row style={row}>{bikeItems}</Row>;
  }
}

export default compose(
  graphql(
    getBikesQuery,
    { name: "getBikesQuery" },
    { options: { fetchPolicy: "network-only" } }
  )
)(Bikes);
