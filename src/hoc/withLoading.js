import React, { PureComponent } from "react";
import PropTypes from "prop-types";

const withLoading = Component =>
  class extends PureComponent {
    static propTypes = {
      /** Boolean to determine lf loading. */
      isLoading: PropTypes.bool.isRequired
    };

    render() {
      const { isLoading } = this.props;

      if (isLoading) {
        return (
          <div>Loading...</div>
        );
      }

      return <Component {...this.props} />;
    }
  };

export default withLoading;
