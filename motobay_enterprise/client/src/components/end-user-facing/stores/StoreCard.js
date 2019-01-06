import React, { Component } from "react";
import { Link } from "react-router-dom";
import FeaturedBikes from "../bikes/FeaturedBikeCard";
import "./StoreCard.css";
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

let cardStyle = {
  boxShadow: "0 10px 20px rgb(253,99,1,0.19), 0 6px 6px rgba(0,0,0,0.23)",
  backgroundColor: "white"
};

export default class StoreItem extends Component {
  render() {
    const { store } = this.props;
    console.log({ store });
    console.log(store.stores_id_fkey);

    return (
      <div className="container" style={{ marginTop: "3%" }}>
        <div className="row" style={{ width: "100%" }}>
          <div className="col-12">
            <div
              className="card"
              onClick={this.props.getStoreId.bind(this, store.stores_id_fkey)}
            >
              <div style={cardStyle} className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="display-4">{store.store_name}</div>
                    <br />

                    <br />
                    <Button
                      style={{
                        backgroundColor: "#cf4b11",
                        marginBottom: "10%"
                      }}
                      to="/store-inventory"
                    >
                      View Bikes
                    </Button>
                  </div>
                  <div className="col-md-8">
                    <FeaturedBikes storeID={store.stores_id_fkey} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
