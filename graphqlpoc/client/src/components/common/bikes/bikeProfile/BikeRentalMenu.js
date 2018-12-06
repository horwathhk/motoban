import React from "react";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText
} from "reactstrap";

class BikeRentalMenu extends React.Component {
  render() {
    return (
      <Form>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleEmail">Trip Start</Label>
              <Input
                type="date"
                name="from"
                id="from"
                placeholder="with a placeholder"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="examplePassword">Trip End</Label>
              <Input
                type="date"
                name="until"
                id="until"
                placeholder="password placeholder"
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="exampleAddress">Pick Up Location</Label>
          <Input type="select">
            <option>Default Select</option>
          </Input>
        </FormGroup>

        <Button>Check Out</Button>
      </Form>
    );
  }
}
export default BikeRentalMenu;
