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
  constructor(props) {
    super(props);
    this.state = {
      bike_idInHome: null
    };
  }
  // https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-in-react-router-v4
  componentDidUpdate() {
    let { bike_idInHome } = this.state;
    if ({ bike_idInHome } !== null) {
      localStorage.setItem("bike_id", { bike_idInHome });
      this.props.history.push({
        pathname: "/bike-profile",
        state: { bike_id: this.state.bike_idInHome }
      });
    }
  }

  render() {
    let { bike_idInHome } = this.state;
    this.getBikeIdInHome = bike_id => {
      console.log("fired from home");
      console.log(bike_id);
      this.setState({ bike_idInHome: bike_id }, function() {
        console.log(this.state.bike_idInHome);
      });
    };
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
            <Bikes getBikeIdInHome={this.getBikeIdInHome} />
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
