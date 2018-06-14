import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import moment from "moment";

class Row extends PureComponent {
  static propTypes = {
    /** The app id. */
    id: PropTypes.string.isRequired,

    /** A logo for the app. */
    logo: PropTypes.string.isRequired,

    /** The apps name. */
    name: PropTypes.string.isRequired,

    /** The apps created date. */
    created: PropTypes.string.isRequired,

    /** History object provided by react-router. */
    history: PropTypes.shape({
      /**
       * Function to push new history
       *
       * @param {string}  Route  A new route to push
       * @returns {void} No return
       */
      push: PropTypes.func.isRequired
    }).isRequired
  };

  handleClick = () => {
    const { history, id } = this.props;
    history.push(`/app/${id}`);
  };

  render() {
    const { logo, name, created } = this.props;

    return (
      <tr
        onClick={this.handleClick}
        className="table__row__link"
      >
        <td>
          <img
            alt={name}
            src={logo}
            width="50"
          />
        </td>
        <td>{name}</td>
        <td>{moment(created).format('MMMM Do YYYY')}</td>
      </tr>
    );
  }
}

export default withRouter(Row);
