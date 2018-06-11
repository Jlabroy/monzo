import React, { Component } from "react";
import {  BrowserRouter as Router, Route, Link  } from "react-router-dom";
import App from "./App";
import Login from "./Login";

class Routes extends Component {
  render() {
    return (
      <Router>
        <div>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>

          <Route exact path="/" component={App} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default Routes;
