import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const mapStateToProps = ({ app: { accessToken } }) => ({
  accessToken
});

const withAuthentication = Component =>
  connect(mapStateToProps)(
    withRouter(
      class extends PureComponent {
        static propTypes = {
          /** An access token to validate the user. */
          accessToken: PropTypes.string.isRequired
        };

        componentDidMount() {
          const { accessToken, history } = this.props;
          if (!accessToken) {
            history.push("/login");
          }
        }

        render() {
          const { accessToken } = this.props;

          if (!accessToken) {
            return null;
          }

          return <Component {...this.props} />;
        }
      }
    )
  );

export default withAuthentication;
