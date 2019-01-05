import React, { Component } from "react";
import Flexbox from "flexbox-react";
import { Container, Row, Col } from "reactstrap";

import SearchBikes from "../SearchBikes";
import Filter from "../filters/Filter";
import Bikes from "../bikes/Bikes";

const main = {
  margin: "5rem"
  // width: "100rem"
};

const card = {
  width: "23rem",
  height: "25rem",
  display: "inline-block"
};

const text = {
  width: "100%"
};

const row = {
  marginLeft: "10px",
  overflow: "hidden"
};

const googleMap = {
  overflow: "hidden",
  background: "#76a2b2"
};

const container = {
  marginLeft: "10px"
};
class StoreInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store_id: null,
      bike_id: null,
      renters_id_fkey: null,
      bikes_rentals_id: null
    };
  }
  // https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-in-react-router-v4
  componentWillMount() {
    console.log("component will mount");
    console.log(this.props.location.state.store_id);
    let storeID = this.props.location.state.store_id;
    this.setState({ store_id: storeID });
    console.log(typeof store_id);
    // const response = this.props.getBikeQuery;
    // console.log("response form componentWillMount");
    // console.log(response);
  }
  componentDidUpdate() {
    let { bike_id, renters_id_fkey, store_id, bikes_rentals_id } = this.state;
    console.log({ bike_id });
    console.log(bikes_rentals_id);
    if ({ bike_id } !== null) {
      console.log({ renters_id_fkey });
      this.props.history.push({
        pathname: "/bike-profile",
        state: {
          bike_id: bike_id,
          renters_id_fkey: renters_id_fkey,
          stores_id: store_id,
          bikes_rentals_id: bikes_rentals_id
        }
      });
    }
  }

  render() {
    this.getBikeId = (bike_id, renters_id_fkey, bikes_rentals_id) => {
      console.log("fired from home");
      console.log(bike_id);
      console.log(renters_id_fkey);
      console.log(bikes_rentals_id);

      this.setState({ bike_id, renters_id_fkey, bikes_rentals_id }, function() {
        console.log(this.state.bike_id);
        console.log(this.state.renters_id_fkey);
      });
    };

    console.log("state from inventory");
    console.log(this.state.store_id);
    const { store_id } = this.state;
    return (
      <div style={googleMap}>
        <Row>
          <Col>
            <SearchBikes />
          </Col>
        </Row>
        <Row style={row}>
          <Col>
            <Filter />
          </Col>
        </Row>
        <div className="container">
          <Row style={row}>
            <div className="col-md-12">
              <Bikes getBikeIdInHome={this.getBikeId} storeID={store_id} />
            </div>
          </Row>
        </div>
      </div>
    );
  }
}
export default StoreInventory;
