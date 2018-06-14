import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Table from "./Table";
import Row from "./Row";
import "./styles.css";

class Apps extends PureComponent {
  static propTypes = {
    /** Array of app data. */
    data: PropTypes.arrayOf(
      PropTypes.shape(Row.PropTypes)
    ).isRequired,

    /** Boolean to indicate whether the app is loading. */
    isLoading: PropTypes.bool.isRequired
  };

  render() {
    const { data, isLoading } = this.props;

    return (
      <div className="apps">
        <h1>Apps</h1>
        <Table
          data={data}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

export default Apps;
