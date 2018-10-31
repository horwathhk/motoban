import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Dashboard from "./components/common/dashboard/dashboard";

//apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/motoban"
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
              path="/dashboard"
              component={Dashboard}
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
