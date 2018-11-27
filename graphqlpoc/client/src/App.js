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
// import { InMemoryCache } from "apollo-cache-inmemory";

import { ApolloLink, concat } from "apollo-link";

//components
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Signin from "./components/auth/Signin";
import SigninModule from "./components/layout/Navbar/SignInModal";
import Dashboard from "./components/common/dashboard/Dashboard";
import Home from "./components/common/bikes/Home";
//https://www.apollographql.com/docs/react/advanced/network-layer.html
//https://www.apollographql.com/docs/react/recipes/authentication.html
//https://www.youtube.com/watch?v=sK9SjEjlz6U&index=12&list=PLN3n1USn4xlkdRlq3VZ1sT6SGW0-yajjL

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

// const afterwareLink = new ApolloLink((operation, forward) => {
//   return forward(operation).map(response => {
//     const { response: { headers } } = operation.getContext();
//     if (headers) {
//       const token = headers.get("token");
//       // const refreshToken = headers.get("x-refresh-token");

//       if (token) {
//         localStorage.setItem("token", token);
//       }

//       // if (refreshToken) {
//       //   localStorage.setItem("refreshToken", refreshToken);
//       // }
//     }

//     return response;
//   });
// });

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

// const authLink = setContext((_, { headers }) => {
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem("token");
//   // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : ""
//     }
//   };
// });

// const authMiddleware = new ApolloLink((operation, forward) => {
//   // add the authorization to the headers
//   operation.setContext({
//     headers: {
//       authorization: localStorage.getItem("token") || null
//     }
//   });

//   return forward(operation);
// });

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <div className="container" />
            <Route
              exact
              path="/register"
              component={Register}
              // props={AddUser}
            />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/signin" component={SigninModule} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route
              exact
              path="/home"
              component={Home}
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
