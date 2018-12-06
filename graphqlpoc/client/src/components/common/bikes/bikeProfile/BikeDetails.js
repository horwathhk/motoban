import React, { Component } from "react";
import { getBikeQuery } from "../../../../queries/queries";
import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";

class BikeDetails extends Component {
  componentDidUpdate() {
    console.log(this.props.bikeID);
  }

  componentWillUpdate() {
    console.log(this.props.bikeID);
    let bike_id = this.props.bikeID;
    console.log(typeof bike_id);
    // if (bike_id !== null) {
    //   this.props.getBikeQuery({
    //     variables: {
    //       bike_id: bike_id
    //     }
    //   });
    // }
  }
  componentWillMount() {
    console.log(this.props.bikeID);
    console.log(this.props.bikeID);
    let bike_id = this.props.bikeID;
    console.log(typeof bike_id);
    // if (bike_id !== null) {
    //   this.props.getBikeQuery({
    //     variables: {
    //       bike_id: bike_id
    //     }
    //   });
    // }
  }

  render() {
    console.log("from bike details");
    console.log(this.props.bikeID);
    let bikes = this.props.getBikeQuery;
    let bike = this.props;
    console.log(bike);
    console.log(this.props);
    console.log(bikes);
    return (
      <div>
        {this.props.bikeId}
        <div class="row justify-content-start">
          <div class="col-2">THE BIKE</div>
          <div class="col-2">Aaron's</div>
        </div>
        <div class="row justify-content-start">
          <div class="col-2" />
          <div class="col-3">Honda Nuovo</div>
          <br />
        </div>
        <div class="row justify-content-start">
          <div class="col-2" />
          <div class="col-2">****</div>
          <div class="col-2">5 trips</div>
        </div>
        <div class="row justify-content-start">
          <div class="col-2" />
          <div class="col-2">MPG Icon</div>
          <div class="col-2">Gas Type Icon</div>
        </div>
        <div class="row justify-content-start">
          <div class="col-2" />
          <div class="col-2">2 Door</div>
          <div class="col-2">5 Seat</div>
        </div>
        <br />
        <br />
        <div class="row justify-content-start">
          <div class="col-4"> ENGINE TYPE</div>

          <div class="col-2">Automatic</div>
        </div>
        <br />
        <div class="row justify-content-start">
          <div class="col-2">DESCRIPTION</div>
          <div class="col-12">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
        </div>
        <br />
        <div class="row justify-content-start">
          <div class="col-2"> FEATURES</div>
          <div class="col-3">Electic Starter</div>
          <div class="col-3">Gas Type Icon</div>
        </div>
        <div class="row justify-content-start">
          <div class="col-2" />
          <div class="col-3">Dry Storage</div>
          <div class="col-3">Phone Holder</div>
        </div>
      </div>
      // </div>
    );
  }
}

export default graphql(getBikeQuery, {
  options: props => ({ variables: { bike_id: props.bikeID } })
})(BikeDetails);
// BikeDetails;
