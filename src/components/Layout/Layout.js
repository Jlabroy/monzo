import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

class Layout extends PureComponent {

  render() {
    const { children } = this.props;

    return (
      <div className="layout">
        <header className="layout__header">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </header>
        <main className="layout__main">
          {children}
        </main>
      </div>
    );
  }
}

export default Layout;
