import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Container,
  Row,
  Col
} from "reactstrap";
import SortByModule from "./SortByModal";
import PriceModule from "./PriceModale";
import OtherFiltersModule from "./OtherFiltersModal";

const style = {
  marginLeft: "60px"
};

const middle = {
  marginRight: "-20px"
};

class FilterContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div style={{ width: "100%" }}>
        <hr
          style={{
            marginBottom: "0%",
            marginLeft: "0px",
            width: "100%",
            overflow: "hidden"
          }}
        />

        <div className="row justify-content-start">
          <div className="col-1">
            <SortByModule />
          </div>
          <div className="col-1">
            <PriceModule />
          </div>
          <div className="col-1">
            <OtherFiltersModule />
          </div>
          <div className="col-4 ml-auto" />
        </div>
        <hr style={{ marginTop: "-1%" }} />
      </div>
    );
  }
}

export default FilterContainer;
