import React, { Component } from "react";
import NavBar from "../bikes/searchBikes/SearchBikes";
import {
  addBikeToUserMutation,
  getCurrentUserQuery,
  addBikeDetailsMutation
} from "../../../queries/queries";
import { graphql, compose } from "react-apollo";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

class ListYourBike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bikes_id: null,
      users_id_fkey: null,
      bikes_id_fkey: null,
      bikes_makers_id_fkey: null,
      bikes_models_id_fkey: null,
      bikes_conditions_id_fkey: null,
      year: null,
      description: "",
      condition: "",
      transmission: null,
      location: "",
      star_rating: null,
      bike_price: null,
      model: ""
    };
  }
  something(bike_id) {
    console.log("function from component worked!");
    console.log(bike_id);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      bikes_id,
      users_id_fkey,
      bikes_id_fkey,
      bikes_conditions_id_fkey,
      maker,
      model,
      year,
      description,
      condition,
      transmission,
      location,
      bikes_price
    } = this.state;

    //get current user id
    let currentUser = this.props.getCurrentUserQuery.currentUser;
    console.log(currentUser);
    console.log(typeof currentUser.users_id);
    let users_id = Number(currentUser.users_id);
    console.log(typeof users_id);
    if (this.state.users_id_fkey === null) {
      this.setState({ users_id_fkey: users_id }, function() {
        console.log("state fired");
        console.log(this.state.users_id_fkey);
      });
    } else {
      return this.state.users_id_fkey;
    }
  }

  submitForm = async e => {
    e.preventDefault();
    console.log("success!");
    let {
      users_id_fkey,
      bikes_id_fkey,
      bikes_makers_id_fkey,
      bikes_models_id_fkey
    } = this.state;
    console.log("state");
    console.log(typeof { users_id_fkey });
    console.log({ users_id_fkey });
    console.log(bikes_makers_id_fkey);
    console.log(bikes_makers_id_fkey);

    // let user_id_fkey = Number(this.state.user_id_fkey);
    // console.log(user_id_fkey);

    const addBike = await this.props.addBikeToUserMutation({
      variables: { users_id_fkey }
    });
    console.log("add bike response");
    // console.log(addBike.data.addBikeToUser.bike_id);
    let bikeID = Number(addBike.data.addBikeToUser.bikes_id);
    console.log("type of for bikeID");
    console.log(bikeID);
    console.log(typeof { bikeID });
    if (bikes_id_fkey === null) {
      this.setState({ bikes_id_fkey: bikeID }, function() {
        let {
          bike_id,
          users_id_fkey,
          bikes_id_fkey,
          bikes_makers_id_fkey,
          bikes_models_id_fkey,
          bikes_conditions_id_fkey,
          model,
          year,
          description,
          condition,
          transmission,
          location,
          bike_price
        } = this.state;

        console.log(this.state.bikes_id_fkey);
        console.log("details before second mutation");
        console.log(transmission);
        console.log(year);
        console.log(bikes_makers_id_fkey);
        console.log(bikes_conditions_id_fkey);

        console.log(typeof bikes_makers_id_fkey);

        console.log(typeof this.state.bikes_id_fkey);
        const secondResponse = this.props.addBikeDetailsMutation({
          variables: {
            bikes_id_fkey,
            year,
            transmission,
            bikes_makers_id_fkey,
            bikes_models_id_fkey,
            bikes_conditions_id_fkey
          }
        });
        console.log("second response");
        console.log(secondResponse);
        console.log("after state set");
        console.log({ bikeID });
      });
    }
  };

  render() {
    const { bikes_id_fkey, year } = this.state;
    console.log({ bikes_id_fkey });
    console.log("year type");
    console.log(typeof Number({ year }));
    console.log({ year });
    return (
      <div>
        <NavBar />
        <div className="row">
          <div className="col-md-5 m-auto">
            <br />
            <h1 className="display-4 text-center">List a Bike</h1>
            <p className="text-center">
              To list a bike on the market place, fill in the information about
              your bike below.
            </p>
            <Form onSubmit={this.submitForm.bind(this)}>
              <FormGroup>
                <Label id="exampleFormControlInput1">Maker</Label>
                <Input
                  type="select"
                  className="form-control"
                  id="location"
                  placeholder="maker"
                  onChange={e =>
                    this.setState({
                      bikes_makers_id_fkey: Number(e.target.value)
                    })
                  }
                >
                  <option>Pick a Maker</option>
                  <option value="1">Yamaha</option>
                  <option value="2">Honda</option>
                  <option value="4">BMW</option>
                  <option value="5">Kawasaki</option>
                  <option value="6">Suzuki</option>
                  <option value="7">Aprilla</option>
                  <option value="8">Daelim</option>
                  <option value="9">Janus</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label id="exampleFormControlInput1">Model</Label>
                <Input
                  type="select"
                  className="form-control"
                  id="location"
                  placeholder="City Name"
                  onChange={e =>
                    this.setState({
                      bikes_models_id_fkey: Number(e.target.value)
                    })
                  }
                >
                  <option>Pick a Model</option>
                  <option value="1">Nuovo</option>
                  <option value="2">Lexam</option>
                  <option value="4">Force</option>
                  <option value="5">Mio</option>
                  <option value="6">Chappy</option>
                  <option value="7">Beluga</option>
                  <option value="8">Airblade</option>
                  <option value="9">Wave</option>
                  <option value="10">Express</option>
                  <option value="11">Cub</option>
                  <option value="12">Ape</option>
                  <option value="13">ST</option>
                  <option value="14">MT50</option>
                  <option value="15">Valkyrie</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label id="exampleFormControlInput1">Year</Label>
                <Input
                  type="text"
                  step="1"
                  className="form-control"
                  id="location"
                  placeholder="Year"
                  onChange={e =>
                    this.setState({ year: Number(e.target.value) })
                  }
                />
              </FormGroup>
              <FormGroup>
                <Label id="exampleFormControlInput1">Description</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="location"
                  placeholder="Add a description for your bike"
                  onChange={e => this.setState({ description: e.target.value })}
                />
              </FormGroup>
              <FormGroup className="form-group">
                <Label for="exampleFormControlInput1">Condition</Label>
                <Input
                  type="select"
                  className="form-control"
                  id="condition"
                  placeholder="Condition"
                  onChange={e =>
                    this.setState({
                      bikes_conditions_id_fkey: Number(e.target.value)
                    })
                  }
                >
                  <option>Pick a Condition</option>
                  <option value="1">Brand New</option>
                  <option value="3">Excellent</option>
                  <option value="4">Very Good</option>
                  <option value="5">Fair</option>
                  <option value="6">Worn</option>
                  <option value="7">Fixer Upper</option>
                  <option value="8">Scrap</option>
                </Input>
              </FormGroup>
              <FormGroup className="form-group">
                <Label for="exampleFormControlInput1">Transmission</Label>
                <Input
                  type="select"
                  className="form-control"
                  id="location"
                  placeholder="Transmission type"
                  onChange={e =>
                    this.setState({ transmission: Number(e.target.value) })
                  }
                >
                  <option>Pick a Transmission Type</option>
                  <option value="1">Manual</option>
                  <option value="2">Semi-Automatic</option>
                  <option value="3">Automatic</option>
                </Input>
              </FormGroup>
              <FormGroup className="form-group">
                <Label for="exampleFormControlInput1">Locations</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="location"
                  placeholder="Where is your bike located?"
                  onChange={e => this.setState({ location: e.target.value })}
                />
              </FormGroup>
              <FormGroup className="form-group">
                <Label for="exampleFormControlInput1">Price Per Day</Label>
                <Input
                  type="location"
                  className="form-control"
                  id="location"
                  placeholder="Price Per Day"
                  onChange={e =>
                    this.setState({ bike_price: Number(e.target.value) })
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
    );
  }
}

export default compose(
  graphql(getCurrentUserQuery, { name: "getCurrentUserQuery" }),
  graphql(addBikeToUserMutation, { name: "addBikeToUserMutation" }),
  graphql(addBikeDetailsMutation, { name: "addBikeDetailsMutation" })
)(ListYourBike);
