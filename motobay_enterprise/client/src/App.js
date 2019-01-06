import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";
import { Provider } from "react-redux";
import { withRouter } from "react-router";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";

import { ApolloLink, concat } from "apollo-link";

//Views (storesview?)
import BikeProfileView from "../src/components/views/BikeProfileView";
import LandingView from "./components/views/LandingView";
import MyProfileView from "./components/views/MyProfileView";
import RegisterBikeView from "./components/views/RegisterBikeView";
import RenterRegistrationView from "./components/views/RenterRegistrationView";
import SigninView from "../src/components/views/BikeProfileView";
import SignUpView from "../src/components/views/SignUpView";
import StoreBikesViews from "./components/views/StoreBikesView";
import StoreRegistrationView from "./components/views/StoreRegistrationView";
import StoresView from "./components/views/StoresView";

//components
import SigninModule from "./components/end-user-facing/auth/SignInModal";
import RenterRegistrationForm from "./components/end-user-facing/renter/RenterRegistrationForm";
import StoreRegistrationForm from "./components/end-user-facing/stores/StoreRegistrationForm";
import Footer from "./components/end-user-facing/navigation/Footer";
// import Bikes from "./components/common/bikes/Bikes";
import DropDown from "./components/end-user-facing/bikes/SearchBikesCard";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/motoban",
  credentials: "same-origin"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            {/* views */}
            <Route exact path="/" component={LandingView} />
            <div className="container" />
            <Route exact path="/signup" component={SignUpView} />
            <Route exact path="/signin" component={SigninView} />
            <Route exact path="/my-profile-view" component={MyProfileView} />
            <Route exact path="/stores" component={StoresView} />
            <Route exact path="/register-bike" component={RegisterBikeView} />

            <Route exact path="/bike-profile" component={BikeProfileView} />
            <Route exact path="/store-bikes" component={StoreBikesViews} />
            <Route
              exact
              path="/store-registration"
              component={StoreRegistrationView}
            />
            {/* components */}
            <Route exact path="/signin" component={SigninModule} />

            <Route exact path="/dropdown" component={DropDown} />

            {/* <Route exact path="/bikes" component={Bikes} /> */}
            <Route
              exact
              path="/renter-registration"
              component={RenterRegistrationView}
            />
            <Route
              exact
              path="/renter-registration-form"
              component={RenterRegistrationForm}
            />
            <Route
              exact
              path="/store-registration-form"
              component={StoreRegistrationForm}
            />

            <Footer />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
