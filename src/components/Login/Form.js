import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { withRouter } from "react-router-dom";

class Form extends PureComponent {
  static propTypes = {
    /**
     * Function to login the user.
     *
     * @param {string}  email  The users email address
     * @param {string}  password  The users password
     * @returns {void} No return.
     */
    onLogin: PropTypes.func.isRequired,

    /** History object provided by react-router. */
    history: PropTypes.shape({
      /**
       * Function to push new history
       *
       * @param {string}  Route  A new route to push
       * @returns {void} No return
       */
      push: PropTypes.func.isRequired
    }).isRequired,

    /**
     * Function to handle the form submit, provided by redux-form
     *
     * @param {function} Function which is run on form submit
     * @returns {void} No return
     */
    handleSubmit: PropTypes.func.isRequired,

    /** Optional error provided by redux-form. */
    error: PropTypes.string
  };

  static defaultProps = {
    error: ""
  };

  handleSubmit = async form => {
    const { onLogin, history } = this.props;
    try {
      await onLogin(form);
      history.push("/");
    } catch ({ message }) {
      throw new SubmissionError({ _error: message });
    }
  };

  render() {
    const { handleSubmit, error } = this.props;

    return (
      <form
        className="login__form"
        onSubmit={handleSubmit(this.handleSubmit)}
      >
        <h1>Login</h1>
        <Field
          name="email"
          component="input"
          placeholder="Email"
          type="text"
        />
        <Field
          name="password"
          component="input"
          placeholder="Password"
          type="password"
        />
        <button type="submit">Login</button>
        {error && (
          <div className="error">{error}</div>
        )}
      </form>
    );
  }
}

export default reduxForm({
  form: 'login'
})(withRouter(Form));
