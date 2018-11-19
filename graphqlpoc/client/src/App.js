import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

import { ApolloLink, concat } from "apollo-link";

//components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/common/dashboard/Dashboard";
import Bikes from "./components/common/bikes/Bikes";
//https://www.apollographql.com/docs/react/advanced/network-layer.html

const httpLink = new HttpLink({
  uri: "http://localhost:4000/motoban",
  credentials: "same-origin"
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem("token") || null
    }
  });

  return forward(operation);
});

//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/motoban",
  link: concat(authMiddleware, httpLink),
  dataIdFromObject: o => o.id
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container" />
            <Route
              exact
              path="/register"
              component={Register}
              // props={AddUser}
            />
            <Route
              exact
              path="/login"
              component={Login}
              // props={AddUser}
            />
            <Route
              exact
              path="/dashboard"
              component={Dashboard}
              // props={AddUser}
            />
            <Route
              exact
              path="/bikes"
              component={Bikes}
              // props={AddUser}
            />
            <Footer />
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
