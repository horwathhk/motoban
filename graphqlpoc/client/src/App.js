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

//components
import Landing from "./components/layout/Landing";
import ListYourBike from "./components/common/listyourbike/ListYourBike";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Signin from "./components/auth/Signin";
import SigninModule from "./components/layout/Navbar/SignInModal";
import Dashboard from "./components/common/dashboard/Dashboard";
import BikeProfile from "./components/common/bikes/bikeProfile/BikeProfile";
import Home from "./components/common/bikes/Home";
import Bikes from "./components/common/bikes/Bikes";
import Home2 from "./components/stores/Home2";
import StoreInventory from "./components/stores/bikes/StoreInventory";
import DropDown from "./components/common/bikes/searchBikes/SearchBikes";
import RenterRegistrationHomePage from "./components/stores/renterRegistration/RenterRegistrationHomePage";
import RenterRegistration from "./components/stores/renterRegistration/RenterRegistration";
import StoreRegistrationHomePage from "./components/stores/bikes/storeRegistration/StoreRegistrationHomePage";
import StoreRegistration from "./components/stores/bikes/storeRegistration/StoreRegistration";
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
            <Route exact path="/" component={Landing} />
            <div className="container" />
            <Route exact path="/register" component={Register} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signin" component={SigninModule} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/list-your-bike" component={ListYourBike} />
            <Route exact path="/bikes" component={Bikes} />
            <Route exact path="/bike-profile" component={BikeProfile} />
            <Route exact path="/home2" component={Home2} />
            <Route exact path="/store-inventory" component={StoreInventory} />
            <Route exact path="/dropdown" component={DropDown} />
            <Route
              exact
              path="/renter-registration-home-page"
              component={RenterRegistrationHomePage}
            />
            <Route
              exact
              path="/renter-registration"
              component={RenterRegistration}
            />
            <Route
              exact
              path="/store-registration-home-page"
              component={StoreRegistrationHomePage}
            />
            <Route
              exact
              path="/store-registration"
              component={StoreRegistration}
            />
            <Footer />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
