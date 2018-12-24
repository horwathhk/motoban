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
import SortByModule from "./SortByModule";
import PriceModule from "./PriceModule";
import OtherFiltersModule from "./OtherFiltersModule";
import MapToggle from "./MapToggle";

// const button = {
//   color: "#c5c6c7",
//   width: "10rem",
//   marginBottom: "25px",
//   marginTop: "10px"
// };

const style = {
  marginLeft: "60px"
};

const middle = {
  marginRight: "-20px"
};

class Filter extends React.Component {
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
      <div>
        <hr
          style={{
            marginBottom: "3px",
            marginLeft: "0px",
            overflow: "hidden"
          }}
        />
        <div class="row justify-content-start">
          <div class="col-1">
            <SortByModule />
          </div>
          <div class="col-1">
            <PriceModule />
          </div>
          <div class="col-1">
            <OtherFiltersModule />
          </div>
          <div class="col-4 ml-auto">{/* <MapToggle /> */}</div>
        </div>
        <hr style={{ marginTop: "-10px" }} />
      </div>
    );
  }
}

export default Filter;
