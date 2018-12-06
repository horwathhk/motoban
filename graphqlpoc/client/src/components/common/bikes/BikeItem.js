import React, { Component } from "react";
import { Link } from "react-router-dom";

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

export default class BikeItem extends Component {
  // onClickBike(bike_id) {
  //   console.log(bike.bike_id);
  // }

  render() {
    const { bike } = this.props;
    console.log({ bike });

    return (
      <div style={{ marginTop: "30px" }}>
        <Col>
          {/* <Link
            to="bike-profile"
            
          > */}
          <Card
            onClick={this.props.getBikeId.bind(this, bike.bike_id)}
            style={{ height: "350px", width: "300px" }}
          >
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
          {/* </Link> */}
        </Col>
      </div>
    );
  }
}
