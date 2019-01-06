import React from "react";
import { graphql, compose } from "react-apollo";
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

import {
  getRenterQuery,
  addRentalContractMutation,
  addRentalContractStartAndEndDateMutation
} from "../../../queries/queries";

class BikeRentalMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users_id_fkey: null,
      renters_id_fkey: null,
      stores_id_fkey: null,
      bikes_rentals_id_fkey: null,
      rental_contracts_id_fkey: null,
      startdate: null,
      enddate: null,
      timestamp: null
    };
  }
  componentWillReceiveProps() {
    let renter = this.props.rentersIDFkey;
    let userIDFkey = Number(this.props.userIDFkey);
    let storeID = this.props.storesID;
    let bikesRentalsId = this.props.bikesRentalsId;

    console.log(storeID);
    let { stores_id } = this.state;
    console.log(renter);
    console.log(typeof userIDFkey);
    console.log(storeID);
    ///need to get bikes_rentals_id
    this.setState(
      {
        users_id_fkey: userIDFkey,
        renters_id_fkey: renter,
        stores_id_fkey: storeID,
        bikes_rentals_id_fkey: bikesRentalsId
      },
      function() {
        console.log(this.state.stores_id);
      }
    );
  }
  submitForm = async e => {
    e.preventDefault();
    //set state for timestamp
    let currentTime = new Date();
    let converted = currentTime.toISOString();
    this.setState({ timestamp: converted });
    console.log("form working");
    let {
      users_id_fkey,
      renters_id_fkey,
      stores_id_fkey,
      bikes_rentals_id_fkey
    } = this.state;

    console.log(typeof this.state.users_id_fkey);
    let newContract = await this.props.addRentalContractMutation({
      variables: {
        users_id_fkey,
        renters_id_fkey,
        stores_id_fkey,
        bikes_rentals_id_fkey
      }
    });
    console.log("new contract");
    console.log(newContract);
    let rentalContractsIdFkey = Number(
      newContract.data.addRentalContract.rental_contract_id
    );
    console.log(typeof rentalContractsIdFkey);
    this.setState(
      { rental_contracts_id_fkey: rentalContractsIdFkey },
      function() {
        console.log("rental contracts is in state!");
        console.log(this.state.rental_contracts_id_fkey);
        let {
          rental_contracts_id_fkey,
          timestamp,
          startdate,
          enddate
        } = this.state;
        console.log({ timestamp });
        const contractDates = this.props.addRentalContractStartAndEndDateMutation(
          {
            variables: {
              rental_contracts_id_fkey,
              timestamp,
              startdate,
              enddate
            }
          }
        );
        console.log(contractDates);
      }
    );
  };

  render() {
    return (
      <Form onSubmit={this.submitForm.bind(this)}>
        <h1>Book a Rental</h1>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="exampleEmail">Trip Start</Label>
              <Input
                type="date"
                name="from"
                id="from"
                placeholder="with a placeholder"
                onChange={e => this.setState({ startdate: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="examplePassword">End Date</Label>
              <Input
                type="date"
                name="End Date"
                id="endDate"
                placeholder="with a placeholder"
                onChange={e => this.setState({ enddate: e.target.value })}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="examplePassword">Price</Label>
              <Input
                type="text"
                name="price"
                id="price"
                placeholder="price"
                onChange={e => this.setState({ price: Number(e.target.value) })}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="exampleAddress">Pick Up Location</Label>
          <Input type="select">
            <option>Select Pick Up Location</option>
            <option>At the Store</option>
            <option>A different address</option>
          </Input>
        </FormGroup>
        <Button>Check Out</Button>
      </Form>
    );
  }
}
export default compose(
  graphql(getRenterQuery, {
    options: props => ({
      variables: { users_id_fkey: Number(props.userIDFkey) }
    })
  }),
  graphql(addRentalContractMutation, { name: "addRentalContractMutation" }),
  graphql(addRentalContractStartAndEndDateMutation, {
    name: "addRentalContractStartAndEndDateMutation"
  })
)(BikeRentalMenu);
