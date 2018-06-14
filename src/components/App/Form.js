import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { withRouter } from "react-router-dom";

class Form extends PureComponent {
  static propTypes = {
    /** The current app id. */
    appId: PropTypes.string.isRequired,

    /**
     * Function to update the app
     *
     * @param {string} appId  The app id to update
     * @param {string} name  The new name for the app
     * @returns {void} No return
     */
    onUpdateApp: PropTypes.func.isRequired,

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

  state = {
    submitted: false
  };

  handleSubmit = async form => {
    const { appId, onUpdateApp } = this.props;

    try {
      await onUpdateApp({ appId, ...form });
      this.setState({ submitted: true });

      setTimeout(() => {
        this.setState({ submitted: false });
      }, 5000);
    } catch ({ message }) {
      throw new SubmissionError({ _error: message });
    }
  };

  render() {
    const { submitted } = this.state;
    const { handleSubmit, error } = this.props;

    return (
      <form
        className="app__form"
        onSubmit={handleSubmit(this.handleSubmit)}
      >
        Update app
        <Field
          name="name"
          component="input"
          placeholder="Name"
          type="text"
        />
        <button type="submit">Update</button>
        {submitted && (
          <div className="success">Saved</div>
        )}
        {error && (
          <div className="error">{error}</div>
        )}
      </form>
    );
  }
}

export default reduxForm({
  form: "app-update"
})(withRouter(Form));
