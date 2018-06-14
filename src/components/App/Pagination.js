import React, { PureComponent } from "react";
import PropTypes from "prop-types";

class Pagination extends PureComponent {
  static propTypes = {
    /** The current page. */
    page: PropTypes.number.isRequired,

    /** The page data. */
    pageData: PropTypes.array.isRequired,

    /**
     * Function to change the page
     *
     * @param {number}  direction  Whether to increment or decrement
     * @returns {void} No return
     */
    onPageChange: PropTypes.func.isRequired,

    /** Boolean to indicate whether the app is loading. */
    isLoading: PropTypes.bool.isRequired
  };

  render() {
    const {
      page,
      pageData,
      onPageChange,
      isLoading
    } = this.props;

    return (
      <div className="app__pagination">
        <button
          onClick={onPageChange(-1)}
          disabled={page === 1}
          className="app__pagination__button"
        >
          prev
        </button>
        <button
          onClick={onPageChange(1)}
          disabled={isLoading || pageData.length !== 25}
          className="app__pagination__button"
        >
          next
        </button>
      </div>
    );
  }
}

export default Pagination;
