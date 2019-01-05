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
import { getBikesOfStoreQuery, getBikesQuery } from "../../../queries/queries";
import BikeCard from "./BikeCard";

const row = {
  marginTop: "0%",
  marginBottom: "5%"
};

class BikesRows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bike_id: null,
      renters_id_fkey: null,
      bikes_rentals_id: null
    };
  }
  getBikeId = (bikeID, rentersIdFkey, bikesRentalsId) => {
    bikeID = Number(bikeID);
    rentersIdFkey = Number(rentersIdFkey);
    bikesRentalsId = Number(bikesRentalsId);
    let { bike_id, renters_id_fkey, bikes_rentals_id } = this.state;
    console.log(bikeID);
    console.log(rentersIdFkey);
    console.log(typeof bikeID);
    console.log(bikes_rentals_id);
    if (bike_id === null && renters_id_fkey === null) {
      console.log("state is null!");

      this.setState(
        {
          bike_id: bikeID,
          renters_id_fkey: rentersIdFkey,
          bikes_rentals_id: bikesRentalsId
        },
        function() {
          // let { bike_id } = this.state;
          // let bikeyID = Number({ bike_id });
          console.log(this.state.bike_id);
          this.props.getBikeIdInHome(
            this.state.bike_id,
            this.state.renters_id_fkey,
            this.state.bikes_rentals_id
          );
          // console.log(bikeyID);
          localStorage.setItem("bike_id", bike_id);
        }
      );
    }

    // this.props.history.push("/bike-profile");
  };
  componentWillMount() {
    let bike = this.props.data;
  }

  render() {
    let { bike_id } = this.state;
    // console.log({ bikeID });

    console.log("passed down from inventory");
    console.log(this.props.storeID);
    let i;
    let bikeItems;
    let bikes = this.props.data.bikesOfStore;
    console.log(bikes);
    if (bikes) {
      bikeItems = bikes.map(bike => (
        <BikeCard getBikeId={this.getBikeId} key={bike.bike_id} bike={bike} />
      ));
    }

    console.log(bikeItems);

    return <Row style={row}>{bikeItems}</Row>;
  }
}

export default graphql(getBikesOfStoreQuery, {
  options: props => ({ variables: { store_id: props.storeID } })
})(BikesRows);
