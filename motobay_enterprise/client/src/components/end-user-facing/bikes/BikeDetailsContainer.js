import React, { Component } from "react";
import { getBikeQuery } from "../../../queries/queries";
import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";
//I think I should actually do this call once in BikeProfile and then pass all the data to the child components.

class BikeDetailsContainer extends Component {
  render() {
    console.log(this.props.year);
    return (
      <div>
        <p className="h1">Bike Details</p>
        <div class="row justify-content-start">
          <div class="col-2">THE BIKE</div>
          <div class="col-6">
            Aaron's {this.props.year} {this.props.bikesMakersName}{" "}
            {this.props.bikesModelsName}
          </div>
        </div>
        <div class="row justify-content-start">
          <div class="col-2" />
          <div class="col-3" />
          <br />
        </div>
        <div class="row justify-content-start">
          <div class="col-2">CONDITION:</div>
          <div class="col-8">
            {this.props.bikes_conditions_id_fkeybikes_conditions}
          </div>
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

export default BikeDetailsContainer;
