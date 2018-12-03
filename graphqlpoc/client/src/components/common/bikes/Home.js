import React, { Component } from "react";
import Flexbox from "flexbox-react";
import { Container, Row, Col } from "reactstrap";

import SearchBikes from "./searchBikes/SearchBikes";
import Filter from "./filter/Filter";
import Bikes from "./Bikes";
import GoogleMap from "./GoogleMap";
const main = {
  margin: "5rem"
  // width: "100rem"
};

const card = {
  width: "23rem",
  height: "25rem",
  display: "inline-block"
};

// const row = {
//   overflowX: "scroll",
//   whiteSpace: "nowrap",
//   // width: "200%",
//   overflowY: "hidden"
// };

const text = {
  width: "100%"
};

const row = {
  marginLeft: "10px",
  overflow: "hidden"
};

const googleMap = {
  overflow: "hidden"
};

const container = {
  marginLeft: "10px"
};
class Home extends Component {
  render() {
    return (
      <div style={googleMap}>
        <Row>
          <Col>
            <SearchBikes />
          </Col>
        </Row>
        <Container style={container}>
          <Row style={row}>
            <Col xs="6">
              <Filter />
            </Col>
          </Row>
        </Container>
        {/* // <Container style={container}> */}
        <Row style={row}>
          <Col xs="8">
            <Bikes />
          </Col>
          <Col xs="4">
            <GoogleMap />
          </Col>
        </Row>
        {/* </Container> */}
      </div>
    );
  }
}
export default Home;
