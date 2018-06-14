import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import withLoading from "../../hoc/withLoading";
import Row from "./Row";

class Apps extends PureComponent {
  static propTypes = {
    /** A list of all the app data. */
    data: PropTypes.arrayOf(
      PropTypes.shape(Row.PropTypes)
    ).isRequired
  };

  render() {
    const { data } = this.props;

    return (
      <table className="apps__table">
        <thead>
          <td />
          <td />
          <th>Created</th>
        </thead>
        <tbody>
        {data.map(({ id, logo, name, created }) => (
          <Row
            key={id}
            id={id}
            logo={logo}
            name={name}
            created={created}
          />
        ))}
        </tbody>
      </table>
    );
  }
}

export default withLoading(Apps);
