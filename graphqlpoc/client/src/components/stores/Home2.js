import React, { Component } from "react";
import Flexbox from "flexbox-react";
import { Container, Row, Col } from "reactstrap";

import SearchBikes from "../common/bikes/searchBikes/SearchBikes";
import Filter from "../common/bikes/filter/Filter";
import Stores from "./Stores";
import GoogleMap from "../common/bikes/GoogleMap";
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
  marginLeft: "0px"
};
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store_idInHome: null
    };
  }
  // https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-in-react-router-v4
  componentDidUpdate() {
    let { store_idInHome } = this.state;
    if ({ store_idInHome } !== null) {
      console.log(store_idInHome);
      this.props.history.push({
        //need to create /store-profile
        // pathname: "/home" works
        pathname: "/store-inventory",
        state: { store_id: this.state.store_idInHome }
      });
    }
  }

  render() {
    let { store_idInHome } = this.state;
    this.getStoreIdInHome = store_id => {
      console.log("fired from home");
      console.log(store_id);
      this.setState({ store_idInHome: store_id }, function() {
        console.log(this.state.store_idInHome);
      });
    };
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
        <Row style={row}>
          <Col>
            <Stores getStoreIdInHome={this.getStoreIdInHome} />
          </Col>
        </Row>
      </div>
    );
  }
}
export default Home;
