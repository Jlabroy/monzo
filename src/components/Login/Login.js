import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import "./styles.css";

class Login extends PureComponent {
  static propTypes = {
    /**
     * Function to login the user.
     *
     * @param {string}  email  The users email address
     * @param {string}  password  The users password
     * @returns {void} No return.
     */
    onLogin: PropTypes.func.isRequired
  };

  render() {
    const { onLogin } = this.props;

    return (
      <div className="login">
        <Form onLogin={onLogin} />
      </div>
    );
  }
}

export default Login;
