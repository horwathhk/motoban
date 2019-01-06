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

let cardStyle = {
  boxShadow: "0 10px 20px rgb(253,99,1,0.19), 0 6px 6px rgba(0,0,0,0.23)",
  backgroundColor: "white",
  height: "350px",
  width: "300px"
};

export default class BikeCard extends Component {
  render() {
    const { bike } = this.props;
    console.log({ bike });

    return (
      <div style={{ marginTop: "30px" }}>
        <div className="col-md-12">
          <Card
            onClick={this.props.getBikeId.bind(
              this,
              bike.bikes_id,
              bike.renters_id_fkey,
              bike.bikes_rentals_id
            )}
            style={cardStyle}
          >
            <CardImg
              style={{ marginTop: "10px", height: "200px", width: "100%" }}
              top
              src={bike1}
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle>
                {bike.year}
                <br />
                {bike.bikes_makers_name} {bike.bikes_models_name}
              </CardTitle>
              <CardSubtitle>{bike.bike_price}/per day</CardSubtitle>
              <CardSubtitle>{bike.condition}</CardSubtitle>
              <CardText>{bike.description}</CardText>
              {/* <Button>See More</Button> */}
            </CardBody>
          </Card>
          {/* </Link> */}
        </div>
      </div>
    );
  }
}
