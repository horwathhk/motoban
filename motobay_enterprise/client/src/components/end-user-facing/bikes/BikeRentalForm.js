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

//http://prntscr.com/m2m37b

import {
  getRenterQuery,
  addRentalContractMutation,
  addRentalContractStartAndEndDateMutation
} from "../../../queries/queries";

class BikeRentalForm extends React.Component {
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
        <Row form>
          <Col md={12}>
            <div
              className="card"
              style={{
                boxShadow:
                  "0 10px 20px rgb(253,99,1,0.19), 0 6px 6px rgba(0,0,0,0.23)"
              }}
            >
              <div className="card-body">
                <h5 className="card-title">23$ Per Day</h5>
                <div class="rating">
                  <span>☆</span>
                  <span>☆</span>
                  <span>☆</span>
                  <span>☆</span>
                  <span>☆</span>
                  <small class="text-muted">208</small>
                </div>
                <hr />
                <FormGroup>
                  <Label for="examplePassword">
                    Trip Start
                    <Input
                      type="date"
                      name="price"
                      id="price"
                      placeholder="start"
                      onChange={e =>
                        this.setState({ price: Number(e.target.value) })
                      }
                    />
                  </Label>
                </FormGroup>
                <FormGroup>
                  <Label for="examplePassword">
                    Trip Start
                    <Input
                      type="date"
                      name="price"
                      id="price"
                      placeholder="start"
                      onChange={e =>
                        this.setState({ price: Number(e.target.value) })
                      }
                    />
                  </Label>
                </FormGroup>

                <FormGroup>
                  <Label for="examplePassword">
                    Pick Up Location
                    <Input
                      type="select"
                      name="price"
                      id="price"
                      placeholder="start"
                      onChange={e =>
                        this.setState({ price: Number(e.target.value) })
                      }
                    >
                      <option>Pick Up Location</option>
                      <option>At The Store</option>
                      <option>Deliver to Me</option>
                    </Input>
                  </Label>
                </FormGroup>
                <Button
                  style={{
                    backgroundColor: "#cf4b11",
                    width: "100%",
                    height: "3rem"
                  }}
                >
                  Book
                </Button>
              </div>
            </div>
          </Col>
        </Row>
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
)(BikeRentalForm);
