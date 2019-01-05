import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql, compose } from "react-apollo";

import SearchBikes from "../end-user-facing/bikes/SearchBikesCard";
import {
  addStoreMutation,
  addStoreDetailsMutation
} from "../../queries/queries";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class StoreRegistrationHomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      renters_id_fkey: null,
      stores_id_fkey: null,
      store_name: "",
      locations_countries_id_fkey: null,
      locations_cities_id_fkey: null,
      store_address: "",
      store_phone: "",
      store_phone_country_code: "",
      store_website: "",
      store_description: "",
      store_hours: "",
      store_email: ""
    };
  }

  componentWillMount() {
    let { renters_id_fkey } = this.state;
    console.log("component will mount");
    console.log(this.props.location.state.renters_id_fkey);
    let rentersIdFkey = Number(this.props.location.state.renters_id_fkey);
    console.log(typeof rentersIdFkey);
    this.setState({ renters_id_fkey: rentersIdFkey }, function() {
      console.log("fkey");
      console.log({ renters_id_fkey });
      console.log(typeof this.state.renters_id_fkey);
    });
  }

  submitForm = async e => {
    e.preventDefault();
    console.log("form woking");
    let { renters_id_fkey } = this.state;
    console.log({ renters_id_fkey });
    let createStore = await this.props.addStoreMutation({
      variables: { renters_id_fkey: this.state.renters_id_fkey }
    });
    console.log("mutation response");
    console.log(createStore);

    let storeID = createStore.data.addStore.stores_id;
    this.setState({ stores_id_fkey: storeID }, function() {
      let {
        stores_id_fkey,
        store_name,
        locations_countries_id_fkey,
        locations_cities_id_fkey,
        store_address,
        store_phone,
        store_phone_country_code,
        store_website,
        store_description,
        store_hours,
        store_email
      } = this.state;
      console.log("stores_id_fkey");
      console.log({ stores_id_fkey });
      console.log(typeof { stores_id_fkey });
      console.log({ store_phone_country_code });
      console.log(typeof { store_phone_country_code });
      const storeDetails = this.props.addStoreDetailsMutation({
        variables: {
          stores_id_fkey,
          store_name,
          locations_countries_id_fkey,
          locations_cities_id_fkey,
          store_address,
          store_phone,
          store_phone_country_code,
          store_website,
          store_description,
          store_hours,
          store_email
        }
      });
      console.log("add details response!");
      console.log(storeDetails);
    });
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <SearchBikes />
          </div>
          <div class="jumbotron">
            <h1 class="display-4 text-center">Create A Motorbike Shop</h1>
            <p class="lead text-center">
              You are all set up as renter. Now it is time to create a shop.
            </p>
          </div>
          <div className="Register Store">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <p className="lead text-center">
                    Tell us a bit about your motorcycle shop and we will help
                    get you set up.
                  </p>
                  <Form onSubmit={this.submitForm.bind(this)}>
                    <FormGroup>
                      <Label id="exampleFormControlInput1">Store Name</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="storeName"
                        placeholder="Ex: Quan's Motorbikes"
                        onChange={e =>
                          this.setState({ store_name: e.target.value })
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label id="exampleFormControlInput1">Store Address</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="storeName"
                        placeholder="johndoe@gmail.com"
                        onChange={e =>
                          this.setState({ store_address: e.target.value })
                        }
                      />
                    </FormGroup>

                    <FormGroup className="form-group">
                      <Label for="exampleFormControlInput1">City</Label>
                      <Input
                        type="select"
                        className="form-control"
                        id="location"
                        placeholder="City"
                        onChange={e =>
                          this.setState({
                            locations_cities_id_fkey: Number(e.target.value)
                          })
                        }
                      >
                        <option>Select A Country</option>
                        <option value="1">Hanoi</option>
                        <option value="2">Da Nang</option>
                        <option value="3">Ho Chi Minh</option>
                        <option value="4">Bangkok</option>
                        <option value="5">Phuket</option>
                        <option value="6">Chiang Mai</option>
                        <option value="7">Siem Reap</option>
                      </Input>
                    </FormGroup>
                    <FormGroup className="form-group">
                      <Label for="exampleFormControlInput1">Country</Label>
                      <Input
                        type="select"
                        className="form-control"
                        id="location"
                        placeholder="country"
                        onChange={e =>
                          this.setState({
                            locations_countries_id_fkey: Number(e.target.value)
                          })
                        }
                      >
                        <option>Select A Country</option>
                        <option value="232">Vietnam</option>
                        <option value="211">Thailand</option>
                        <option value="36">Cambodia</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label id="exampleFormControlInput1">
                        Phone Number Country Code
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="storeName"
                        placeholder="Ex: +84"
                        onChange={e =>
                          this.setState({
                            store_phone_country_code: Number(e.target.value)
                          })
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label id="exampleFormControlInput1">Phone Number</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="storeName"
                        placeholder="555-5555-5555"
                        onChange={e =>
                          this.setState({ store_phone: Number(e.target.value) })
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label id="exampleFormControlInput1">Store Website</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="storeName"
                        placeholder="Store Website"
                        onChange={e =>
                          this.setState({ store_website: e.target.value })
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label id="exampleFormControlInput1">Store Email</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="storeName"
                        placeholder="Store Email"
                        onChange={e =>
                          this.setState({ store_email: e.target.value })
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label id="exampleFormControlInput1">
                        Store Description
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="storeName"
                        placeholder="Describe your store"
                        onChange={e =>
                          this.setState({ store_description: e.target.value })
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label id="exampleFormControlInput1">Store Hours</Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="storeName"
                        placeholder="Store Hours"
                        onChange={e =>
                          this.setState({ store_hours: e.target.value })
                        }
                      />
                    </FormGroup>
                    <FormGroup>
                      <Input
                        // disabled={!isEnabled}
                        type="submit"
                        classNameName="btn btn-info btn-block mt-4"
                      />
                    </FormGroup>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default compose(
  graphql(
    addStoreMutation,
    { name: "addStoreMutation" },
    { options: { fetchPolicy: "network-only" } }
  ),
  graphql(addStoreDetailsMutation, { name: "addStoreDetailsMutation" })
)(StoreRegistrationHomePage);
