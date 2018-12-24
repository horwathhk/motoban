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
import Bike2 from "../../image/bike2.jpg";
import Bike15 from "../../image/bike15.png";

const card = {
  width: "20rem",
  marginLeft: "1rem"
};

export default class FeaturedBikesCards extends Component {
  render() {
    const { bike } = this.props;
    console.log({ bike });
    return (
      <Col>
        <div style={card} className="card">
          <img
            className="card-img-top centered"
            src={Bike2}
            alt="Card image cap"
            style={{
              marginTop: "2rem"
            }}
          />
          <div className="card-body">
            <h5 className="card-title">
              {bike.year} {bike.bikes_makers_name} {bike.bikes_makers_model}
            </h5>
            <p className="card-text">
              With supporting text below as a natural lead-in to additional
              content.
            </p>
          </div>
        </div>
      </Col>
    );
  }
}
