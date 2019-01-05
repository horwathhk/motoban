import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
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
import { getStoresQuery } from "../../../queries/queries";
import StoreItem from "./StoreCard";

const row = {
  marginTop: "33px",
  marginBottom: "33px"
};

class StoresRows extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store_id: null
    };

    // this.getBikeId = this.getBikeId.bind(this);
    //need to pass the id up to /home and then set it
  }
  //get bike_id on click from BikeItem
  getStoreId = storeID => {
    storeID = Number(storeID);
    let { store_id } = this.state;
    console.log(storeID);
    console.log(typeof storeID);
    if (store_id === null) {
      console.log("state is null!");

      this.setState({ store_id: storeID }, function() {
        let { store_id } = this.state;
        // let bikeyID = Number({ bike_id });
        console.log({ store_id });
        this.props.getStoreIdInHome(this.state.store_id);
        // console.log(bikeyID);
        localStorage.setItem("store_id", store_id);
      });
    }
  };

  render() {
    let { bikeID } = this.state;
    let i;
    let storeItems;
    let stores = this.props.getStoresQuery.AllStores;
    console.log(stores);
    console.log(stores);
    if (stores) {
      storeItems = stores.map(store => (
        <StoreItem
          getStoreId={this.getStoreId}
          key={store.store_id}
          store={store}
        />
      ));
    }
    return (
      <div class="col-sm-12" style={row}>
        {storeItems}
      </div>
    );
  }
}

export default compose(
  graphql(
    getStoresQuery,
    { name: "getStoresQuery" },
    { options: { fetchPolicy: "network-only" } }
  )
)(StoresRows);
