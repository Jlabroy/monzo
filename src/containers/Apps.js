import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchAppsIfRequired } from "../actions/apps";
import withAuthentication from "../hoc/withAuthentication";
import Apps from "../components/Apps";

class Container extends PureComponent {
  static propTypes = {
    /**
     * Function to fetch the list of apps.
     *
     * @returns {{}} dispatch event.
     */
    onFetchApps: PropTypes.func.isRequired
  };

  error = null;

  async componentDidMount() {
    const { onFetchApps } = this.props;

    try {
      await onFetchApps();
    } catch ({ message }) {
      this.error = message;
    }
  }

  render() {
    if (this.error) {
      return (
        <div className="error">{this.error}</div>
      );
    }

    return <Apps {...this.props} />;
  }
}

const mapStateToProps = ({ apps: { data, isLoading } }) => ({
  data,
  isLoading
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
      onFetchApps: fetchAppsIfRequired
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuthentication(Container))
