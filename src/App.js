import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link  } from "react-router-dom";
import Portal from "./components/Portal";
import Login from "./components/Login";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Route exact path="/" component={Portal} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
