import React, { Component } from "react";
import { getBikeQuery } from "../../../../queries/queries";
import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";
//I think I should actually do this call once in BikeProfile and then pass all the data to the child components.

class BikeDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bike_id: null,
      username: "",
      email: "",
      year: "",
      transmission: "",
      bikes_conditions_id_fkey: null,
      bikes_makers_name: "",
      bikes_models_name: "",
      bikes_conditions: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    let bike = nextProps.data.bike;
    console.log(bike);
    this.setState(
      {
        bike_id: bike.bike_id,
        username: bike.username,
        email: bike.email,
        year: bike.year,
        transmission: bike.transmission,
        bikes_makers_name: bike.bikes_makers_name,
        bikes_models_name: bike.bikes_models_name,
        bikes_conditions: bike.bikes_conditions
      },
      function() {
        console.log(this.state.bike_id);
      }
    );
  }

  render() {
    let {
      bike_id,
      username,
      email,
      year,
      transmission,
      bikes_conditions_id_fkey,
      bikes_makers_name,
      bikes_models_name,
      bikes_conditions
    } = this.state;
    // console.log(props.bikeID);
    console.log(this.state.bike);

    return (
      <div>
        <div class="row justify-content-start">
          <div class="col-2">THE BIKE</div>
          <div class="col-6">
            Aaron's {year} {bikes_makers_name} {bikes_models_name}
          </div>
        </div>
        <div class="row justify-content-start">
          <div class="col-2" />
          <div class="col-3" />
          <br />
        </div>
        <div class="row justify-content-start">
          <div class="col-2">CONDITION:</div>
          <div class="col-8">{bikes_conditions}</div>
          <div class="col-2" />
        </div>
        <br />
        <div class="row justify-content-start">
          <div class="col-2">PRICE:</div>
          <div class="col-6">/per day</div>
          <div class="col-2" />
        </div>
        <br />
        <div class="row justify-content-start">
          <div class="col-2">LOCATION:</div>
          <div class="col-6" />
          <div class="col-2" />
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
          <div class="col-12" />
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
    );
  }
}

export default graphql(getBikeQuery, {
  options: props => ({ variables: { bikes_id_fkey: props.bikeID } })
})(BikeDetails);
// BikeDetails;
