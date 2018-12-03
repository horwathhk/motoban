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

const button = {
  backgroundColor: "transparent",
  color: "black",
  marginBottom: "25px",
  marginTop: "10px"
};

class SortByModule extends React.Component {
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
        <Button style={button} onClick={this.toggle}>
          Sort By
        </Button>
        <Row>
          <Col>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className={this.props.className}
            >
              <ModalHeader toggle={this.toggle}>Sort Bikes By</ModalHeader>
              <ModalBody>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio1" /> Location (Closest to
                    You)
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio1" /> Price: Low to High
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio1" /> Relevance
                  </Label>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle}>
                  Filter
                </Button>{" "}
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </Col>
          <Col>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className={this.props.className}
            >
              <ModalHeader toggle={this.toggle}>Sort Bikes By</ModalHeader>
              <ModalBody>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio1" /> Location (Closest to
                    You)
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio1" /> Price: Low to High
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio1" /> Relevance
                  </Label>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle}>
                  Filter
                </Button>{" "}
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </Col>
          <Col>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className={this.props.className}
            >
              <ModalHeader toggle={this.toggle}>Sort Bikes By</ModalHeader>
              <ModalBody>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio1" /> Location (Closest to
                    You)
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio1" /> Price: Low to High
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="radio1" /> Relevance
                  </Label>
                </FormGroup>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.toggle}>
                  Filter
                </Button>{" "}
                <Button color="secondary" onClick={this.toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SortByModule;
