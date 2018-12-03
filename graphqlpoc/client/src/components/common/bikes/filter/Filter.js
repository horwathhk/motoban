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
import SortByModule from "./FilterModule";
import PriceModule from "./PriceModule";
import OtherFiltersModule from "./OtherFiltersModule";

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
        <Row>
          <Col>
            <SortByModule />
          </Col>
          <Col>
            <PriceModule />
          </Col>
          <Col>
            <OtherFiltersModule />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Filter;
