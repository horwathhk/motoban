import React, { Component } from "react";
import SearchBikes from "../searchBikes/SearchBikes";
import BikeCarousel from "./BikeCarousel";
import BikeDetails from "./BikeDetails";
import BikeRentalMenu from "./BikeRentalMenu";
import OwnerDetails from "./OwnerDetails";
import Reviews from "./Reviews";
import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";
import { getBikeQuery } from "../../../../queries/queries";

class BikeProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bike_id: null
    };
  }

  componentWillMount() {
    console.log("component will mount");
    console.log(this.props.location.state.bike_id);
    let bikeID = this.props.location.state.bike_id;
    this.setState({ bike_id: bikeID });
    console.log(typeof bike_id);
    const response = this.props.getBikeQuery;
    console.log("response form componentWillMount");
    console.log(response);
  }

  render() {
    let { bike_id } = this.state;
    console.log({ bike_id });
    // console.log("component render");
    // console.log(this.props.location.state.bike_id);
    return (
      <div>
        <SearchBikes />
        <div
          style={{ marginTop: "-4rem" }}
          className="jumbotron jumbotron-fluid"
        >
          <BikeCarousel />
        </div>
        <div
          //   style={{ border: "solid black" }}
          className="container col-md-9 m-auto"
        >
          <div className="row justify-content-between">
            <div class="col-6">
              <BikeDetails bikeID={bike_id} />
            </div>
            <div className="col-4">
              <BikeRentalMenu />
            </div>
          </div>
          <div className="row justify-content-between">
            <div class="col-6">
              <Reviews />
            </div>
            <div className="col-4">
              <OwnerDetails bikeID={bike_id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BikeProfile;
// export default BikeProfile;
