import React, { Component } from "react";
import Flexbox from "flexbox-react";
import { Container, Row, Col } from "reactstrap";

import SearchBikes from "../end-user-facing/navigation/SearchBikes";
import FilterContainer from "../end-user-facing/filters/FilterContainer";
import StoresRows from "../end-user-facing/stores/StoresRows";

const row = {
  marginLeft: "10px",
  overflow: "hidden"
};

const viewStyle = {
  overflow: "hidden",
  background: "#76A2b2",
  marginBotton: "-10%"
};

class StoresView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store_idInHome: null
    };
  }
  // https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-in-react-router-v4
  componentDidUpdate() {
    let { store_idInHome } = this.state;
    if ({ store_idInHome } !== null) {
      console.log(store_idInHome);
      this.props.history.push({
        pathname: "/store-view",
        state: { store_id: this.state.store_idInHome }
      });
    }
  }

  render() {
    let { store_idInHome } = this.state;
    this.getStoreIdInHome = store_id => {
      console.log("fired from home");
      console.log(store_id);
      this.setState({ store_idInHome: store_id }, function() {
        console.log(this.state.store_idInHome);
      });
    };
    return (
      <div clasName="container" style={viewStyle}>
        <div className="row">
          <SearchBikes />
        </div>
        <div className="row" style={row}>
          <FilterContainer />
        </div>

        <div className="row" style={row}>
          <StoresRows getStoreIdInHome={this.getStoreIdInHome} />
        </div>
      </div>
    );
  }
}
export default StoresView;
