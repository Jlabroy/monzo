import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import withLoading from "../../hoc/withLoading"
import "./styles.css";

class App extends PureComponent {
  static propTypes = {
    /** Array of user data. */
    data: PropTypes.arrayOf(PropTypes.shape({
      /** The users id. */
      id: PropTypes.string.isRequired,

      /** The users avatar. */
      avatar: PropTypes.string.isRequired,

      /** The users name. */
      name: PropTypes.string.isRequired
    })).isRequired
  };

  render() {
    const {
      data
    } = this.props;

    return (
      <table>
        <tbody>
        {data.map(({ id, avatar, name }) => (
          <tr key={id}>
            <td>
              <img
                src={avatar}
                alt={name}
                className="app__avatar"
              />
            </td>
            <td>{name}</td>
          </tr>
        ))}
        </tbody>
      </table>
    );
  }
}

export default withLoading(App);
