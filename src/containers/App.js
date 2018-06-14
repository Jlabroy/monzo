import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import withAuthentication from "../hoc/withAuthentication";
import App from "../components/App/App";
import { updateApp } from "../actions/apps";
import { fetchUsersIfRequired, resetUsers } from "../actions/users";

class Container extends PureComponent {
  static propTypes = {
    /** Match object provided by react-router. */
    match: PropTypes.shape({
      /** Url parameters. */
      params: PropTypes.shape({
        /** The current app id. */
        appId: PropTypes.string.isRequired
      }).isRequired
    }).isRequired,

    /** The current app data. */
    appData: PropTypes.array.isRequired,

    /** The list of user data. */
    data: PropTypes.array.isRequired,

    /**
     * Function to fetch the users
     *
     * @param {string}  appId  The current app id
     * @param {number}  page  The page to request for
     * @returns {void} No return.
     */
    onFetchUsers: PropTypes.func.isRequired,

    /**
     * Function to reset the users.
     * @returns {{}} dispatch event.
     */
    onResetUsers: PropTypes.isRequired,

    /** The current app id. */
    appId: PropTypes.string.isRequired,

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
  };

  error = null;

  state = {
    appId: "",
    app: null,
    page: 1,
    pageData: []
  };

  static getDerivedStateFromProps({ match: { params: { appId } }, appData, data }, { page }) {
    const app = appData.filter(({ id }) => id === appId);
    const offset = page * 25 - 25;
    const results = offset + 25 <= data.length ? offset + 25 : data.length - (data.length - offset);

    return {
      appId,
      app: app.length > 0 ? app[0] : null,
      pageData: offset < data.length ? data.slice(offset, results) : []
    };
  }

  componentDidMount() {
    const { history, onFetchUsers, onResetUsers, appId: prevAppId } = this.props;
    const { app, appId, page } = this.state;

    if (app === null) {
      history.push("/");
    }

    if (appId !== prevAppId) {
      onResetUsers();
    }

    try {
      onFetchUsers(appId, page);
    } catch ({ message }) {
      this.error = null;
    }
  }

  handlePageChange = direction => () => {
    const { onFetchUsers } = this.props;
    const { appId, page } = this.state;

    const newPage = page + direction;
    if (newPage > 0) {
      this.setState({ page: newPage });
      onFetchUsers(appId, newPage);
    }
  };

  render() {
    const { app } = this.state;

    if (app === null) {
      return null;
    }

    if (this.error) {
      return (
        <div className="error">{this.error}</div>
      );
    }

    return (
      <App
        {...this.state}
        {...this.props}
        onPageChange={this.handlePageChange}
      />
    );
  }
}

const mapStateToProps = ({
  users: { appId, data, isLoading },
  apps: { data: appData }
}) => ({
  appId,
  data,
  appData,
  isLoading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
      onFetchUsers: fetchUsersIfRequired,
      onResetUsers: resetUsers,
      onUpdateApp: updateApp
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuthentication(Container))
