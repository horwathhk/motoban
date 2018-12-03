import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Row,
  Col
} from "reactstrap";

import bike1 from "../../../image/bike1.png";

const container = {
  marginBottom: "30 rem",
  marginTop: "30rem"
};

const topRowBuffer = {
  marginTop: "5rem"
};

const rowBuffer = {
  marginTop: "10rem"
};

export default class BikeItem extends Component {
  render() {
    const { bike } = this.props;
    console.log({ bike });
    return (
      <div style={{ marginTop: "30px" }}>
        <Col>
          <Card style={{ height: "350px", width: "300px" }}>
            <CardImg
              style={{ marginTop: "10px", height: "200px", width: "100%" }}
              top
              src={bike1}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle>{bike.model}</CardTitle>
              <CardSubtitle>{bike.bike_price}/per day</CardSubtitle>
              <CardSubtitle>{bike.condition}</CardSubtitle>
              <CardText>{bike.description}</CardText>
              {/* <Button>See More</Button> */}
            </CardBody>
          </Card>
        </Col>
      </div>
    );
  }
}
