import React, { Component } from "react";
import { BrowserRouter as Router, Route  } from "react-router-dom";
import Layout from "./components/Layout";
import Apps from "./containers/Apps";
import App from "./containers/App";
import Login from "./containers/Login";

class Routes extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={props => (<Layout><Apps {...props} /></Layout>)} />
          <Route path="/login" component={props => (<Layout><Login {...props} /></Layout>)} />
          <Route path="/app/:appId" component={props => (<Layout><App {...props} /></Layout>)} />
        </div>
      </Router>
    );
  }
}

export default Routes;
