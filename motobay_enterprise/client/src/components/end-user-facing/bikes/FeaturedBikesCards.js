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
import Bike2 from "../../../image/bike2.jpg";

const card = {
  marginTop: "10%"
};

export default class FeaturedBikesCards extends Component {
  render() {
    const { bike } = this.props;
    console.log({ bike });
    return (
      <div className="col-sm-6">
        <div style={card} className="card">
          <img
            className="col-sm-8 card-img-top centered"
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
      </div>
    );
  }
}
