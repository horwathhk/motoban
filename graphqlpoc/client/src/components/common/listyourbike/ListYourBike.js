import React, { Component } from "react";
import NavBar from "../bikes/searchBikes/SearchBikes";
import {
  addBikeToUserMutation,
  getCurrentUserQuery,
  addBikeDescriptionMutation
} from "../../../queries/queries";
import { graphql, compose } from "react-apollo";

class ListYourBike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bike_id: null,
      user_id_fkey: null,
      bikes_id_fkey: null,
      maker: "",
      year: "",
      description: "",
      condition: "",
      transmission: "",
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
      bike_id,
      user_id_fkey,
      bikes_id_fkey,
      maker,
      model,
      year,
      description,
      condition,
      transmission,
      location,
      bike_price
    } = this.state;

    //get current user id
    let currentUser = this.props.getCurrentUserQuery.currentUser;
    console.log(currentUser.user_id);
    console.log(typeof currentUser.user_id);
    let user_id = Number(currentUser.user_id);
    console.log(typeof user_id);
    if (this.state.user_id_fkey === null) {
      this.setState({ user_id_fkey: user_id });
      console.log("state fired");
    } else {
      return this.state.user_id_fkey;
    }

    // console.log("state of bike_id_fkey");
    // console.log({ bikes_id_fkey });
    // console.log(typeof { bikes_id_fkey });
    //bikes_id_fkey
    // const { bikes_id_fkey } = this.state;

    // console.log("state");
    // console.log(this.state.user_id_fkey);
    // let user_id = currentUser.user_id;
    //   console.log(currentUser.username);
    //   if (this.state.username === "") {
    //     this.setState({ user_id: user_id });
    //   } else {
    //     return this.state.user;
    //   }
  }

  submitForm = async e => {
    e.preventDefault();
    console.log("success!");
    let {
      bike_id,
      user_id_fkey,
      bikes_id_fkey,
      maker,
      model,
      year,
      description,
      condition,
      transmission,
      location,
      bike_price
    } = this.state;
    console.log("state");
    console.log(typeof { user_id_fkey });
    console.log({ user_id_fkey });

    // let user_id_fkey = Number(this.state.user_id_fkey);
    // console.log(user_id_fkey);

    const addBike = await this.props.addBikeToUserMutation({
      variables: { user_id_fkey }
    });
    console.log("add bike response");
    // console.log(addBike.data.addBikeToUser.bike_id);
    let bikeID = Number(addBike.data.addBikeToUser.bike_id);
    console.log("type of for bikeID");
    console.log(bikeID);
    console.log(typeof { bikeID });
    if (bikes_id_fkey === null) {
      this.setState({ bikes_id_fkey: bikeID }, function() {
        let {
          bike_id,
          user_id_fkey,
          bikes_id_fkey,
          maker,
          model,
          year,
          description,
          condition,
          transmission,
          location,
          bike_price
        } = this.state;

        console.log(this.state.bikes_id_fkey);
        // console.log(typeof this.state.bikes_id_fkey);
        const secondResponse = this.props.addBikeDescriptionMutation({
          variables: {
            bikes_id_fkey,
            maker,
            year,
            description,
            condition,
            transmission,
            location,
            bike_price,
            model
          }
        });
        console.log("second response");
        console.log(secondResponse);
        // console.log("after state set");
        // console.log({ bikeID });
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
        <container>
          <NavBar />
          <div>
            <h1>{this.state.user_id}</h1>
            <h1>{this.state.bikes_id_fkey}</h1>
          </div>
          <form onSubmit={this.submitForm.bind(this)}>
            <div className="form-group">
              <label id="exampleFormControlInput1">Maker</label>
              <input
                type="text"
                className="form-control"
                id="location"
                placeholder="City Name"
                onChange={e => this.setState({ maker: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label id="exampleFormControlInput1">Model</label>
              <input
                type="text"
                className="form-control"
                id="location"
                placeholder="City Name"
                onChange={e => this.setState({ model: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label id="exampleFormControlInput1">Year</label>
              <input
                type="text"
                step="1"
                className="form-control"
                id="location"
                placeholder="City Name"
                onChange={e => this.setState({ year: Number(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label id="exampleFormControlInput1">description</label>
              <input
                type="text"
                className="form-control"
                id="location"
                placeholder="City Name"
                onChange={e => this.setState({ description: e.target.value })}
              />
              <div className="form-group">
                <label for="exampleFormControlInput1">condition</label>
                <input
                  type="location"
                  className="form-control"
                  id="location"
                  placeholder="City Name"
                  onChange={e => this.setState({ condition: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label for="exampleFormControlInput1">transmission</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  placeholder="City Name"
                  onChange={e =>
                    this.setState({ transmission: Number(e.target.value) })
                  }
                />
              </div>
              <div className="form-group">
                <label for="exampleFormControlInput1">Locations</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  placeholder="City Name"
                  onChange={e => this.setState({ location: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label for="exampleFormControlInput1">Price Per Day</label>
                <input
                  type="location"
                  className="form-control"
                  id="location"
                  placeholder="City Name"
                  onChange={e =>
                    this.setState({ bike_price: Number(e.target.value) })
                  }
                />
              </div>
              <input
                // disabled={!isEnabled}
                type="submit"
                classNameName="btn btn-info btn-block mt-4"
              />
            </div>
          </form>
        </container>
      </div>
    );
  }
}

export default compose(
  graphql(getCurrentUserQuery, { name: "getCurrentUserQuery" }),
  graphql(addBikeToUserMutation, { name: "addBikeToUserMutation" }),
  graphql(addBikeDescriptionMutation, { name: "addBikeDescriptionMutation" })
)(ListYourBike);
