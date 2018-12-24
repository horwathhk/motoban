import React, { Component } from "react";
import { Link } from "react-router-dom";
import Bike2 from "../../image/bike2.jpg";
import Bike15 from "../../image/bike15.png";
import FeaturedBikes from "./FeaturedBikes";

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

export default class StoreItem extends Component {
  render() {
    const { store } = this.props;
    console.log({ store });
    console.log(store.stores_id_fkey);

    return (
      <div className="container" style={{ marginTop: "3%" }}>
        <div className="row" style={{ width: "110%" }}>
          <div className="col-12">
            <div
              className="card"
              onClick={this.props.getStoreId.bind(this, store.stores_id_fkey)}
            >
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <div className="display-4">{store.store_name}</div>
                    <br />

                    <br />
                    <Link to="/store-inventory" class="btn btn-primary">
                      View Bikes
                    </Link>
                  </div>
                  <FeaturedBikes storeID={store.stores_id_fkey} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
