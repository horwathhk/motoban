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
import { getBikeQuery, getBikesQuery } from "../../../queries/queries";
import BikeItem from "./BikeItem";

const row = {
  marginTop: "33px"
};

class Bikes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bike_id: null
    };

    // this.getBikeId = this.getBikeId.bind(this);
    //need to pass the id up to /home and then set it
  }
  //get bike_id on click from BikeItem
  getBikeId = bikeID => {
    bikeID = Number(bikeID);
    let { bike_id } = this.state;
    console.log(bikeID);
    console.log(typeof bikeID);
    if (bike_id === null) {
      console.log("state is null!");

      this.setState({ bike_id: bikeID }, function() {
        let { bike_id } = this.state;
        // let bikeyID = Number({ bike_id });
        console.log({ bike_id });
        this.props.getBikeIdInHome(this.state.bike_id);
        // console.log(bikeyID);
        localStorage.setItem("bike_id", bike_id);
      });
    }

    // this.props.history.push("/bike-profile");
  };

  render() {
    let i;
    let bikeItems;
    let bikes = this.props.getBikesQuery.bikes;
    console.log(bikes);
    console.log(bikes);
    if (bikes) {
      bikeItems = bikes.map(bike => (
        <BikeItem getBikeId={this.getBikeId} key={bike.bike_id} bike={bike} />
      ));
    }

    console.log(bikeItems);

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
