import React, { Component } from "react";
import Flexbox from "flexbox-react";
import { Container, Row, Col } from "reactstrap";

import SearchBikes from "../../common/bikes/searchBikes/SearchBikes";
import Filter from "../../common/bikes/filter/Filter";
import Bikes from "./Bikes";

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
  background: "#f6ffec"
};

const container = {
  marginLeft: "10px"
};
class StoreInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store_id: null,
      bike_id: null
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
    let { bike_id } = this.state;
    console.log({ bike_id });
    if ({ bike_id } !== null) {
      this.props.history.push({
        pathname: "/bike-profile",
        state: { bike_id: bike_id }
      });
    }
  }

  render() {
    this.getBikeId = bike_id => {
      console.log("fired from home");
      console.log(bike_id);

      this.setState({ bike_id }, function() {
        console.log(this.state.bike_id);
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
