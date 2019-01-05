import React, { Component } from "react";
import SearchBikes from "../end-user-facing/navigation/SearchBikes";
import BikeProfileFeaturedImages from "../end-user-facing/bikes/BikeProfileFeaturedImages";
import BikeDetailsContainer from "../end-user-facing/bikes/BikeDetailsContainer";
import BikeRentalForm from "../end-user-facing/bikes/BikeRentalForm";
import BikeOwnerDetailsCard from "../end-user-facing/bikes/BIkeOwnerDetailsCard";
import BikeReviewsContainer from "../end-user-facing/bikes/BikeReviewsContainer";
import BikeOverviewContainer from "../end-user-facing/bikes/BikeOverviewContainer";
import { gql } from "apollo-boost";
import { graphql, compose } from "react-apollo";
import { getBikeQuery } from "../../queries/queries";

const viewStyle = { overflow: "hidden" };
const row = {
  marginLeft: "10px",
  overflow: "hidden",
  marginBottom: "3%"
};

class BikeProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renters_id_fkey: null,
      bike_id_fkey: null,
      users_id_fkey: null,
      stores_id: null,
      bikes_rentals_id_fkey: null,
      username: "",
      email: "",
      year: "",
      transmission: "",
      bikes_conditions_id_fkey: null,
      bikes_makers_name: "",
      bikes_models_name: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    let renter = nextProps.location.state.renters_id_fkey;
    let stores_id = nextProps.location.state.stores_id;
    let bikesRentalsId = nextProps.location.state.bikes_rentals_id;
    console.log(renter);
    console.log(typeof stores_id);
    console.log(bikesRentalsId);
    let bike = nextProps.data.bike;

    this.setState({
      username: bike.username,
      users_id_fkey: bike.users_id,
      email: bike.email,
      year: bike.year,
      transmission: bike.transmission,
      bikes_conditions_id_fkey: bike.bikes_conditions_id_fkey,
      bikes_makers_name: bike.bikes_makers_name,
      bikes_models_name: bike.bikes_models_name,
      renters_id_fkey: renter,
      stores_id: stores_id,
      bikes_rentals_id_fkey: bikesRentalsId
    });
    console.log(bike);
  }

  componentDidMount() {
    console.log(this.state.users_id);
  }
  render() {
    let {
      username,
      users_id_fkey,
      renters_id_fkey,
      email,
      year,
      transmission,
      bikes_makers_name,
      bikes_models_name,
      bikes_conditions_id_fkey,
      stores_id,
      bikes_rentals_id_fkey
    } = this.state;
    console.log({ stores_id });
    // console.log(props.location.state.renters_id_fkey);
    return (
      <div clasName="container" style={viewStyle}>
        <div className="row">
          <SearchBikes />
        </div>
        <div className="row" style={row}>
          <div className="col-md-4">
            <BikeOverviewContainer />
          </div>
          <div className="col-md-8">
            <BikeProfileFeaturedImages />
          </div>
        </div>

        <div className="row justify-content-between" style={row}>
          <div className="col-w" />
          <div className="col-6">
            <BikeDetailsContainer
              year={year}
              transmission={transmission}
              bikesConditionsIDFkey={bikes_conditions_id_fkey}
              bikesMakersName={bikes_makers_name}
              bikesModelsName={bikes_models_name}
            />
          </div>
          <div className="col-4" style={{ marginRight: "2%" }}>
            <BikeRentalForm
              rentersIDFkey={renters_id_fkey}
              userIDFkey={users_id_fkey}
              storesID={stores_id}
              bikesRentalsId={bikes_rentals_id_fkey}
            />
          </div>
        </div>

        <div className="row justify-content-between" style={row}>
          <div className="col-w" />
          <div className="col-6">
            <BikeReviewsContainer />
          </div>
          <div className="col-4" style={{ marginRight: "2%" }}>
            <BikeOwnerDetailsCard
              style={{ marginRight: "2%" }}
              email={email}
              username={username}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(getBikeQuery, {
    options: props => ({
      variables: { bikes_id_fkey: props.location.state.bike_id }
    })
  })
)(BikeProfileView);
