import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import Table from "./Table";
import Pagination from "./Pagination";

class App extends PureComponent {
  static propTypes = {
    /** Object of app data. */
    app: PropTypes.shape({
      /** A url for the apps logo. */
      logo: PropTypes.string.isRequired,

      /** A string of the apps name. */
      name: PropTypes.string.isRequired
    }),

    /** The current page data. */
    pageData: Table.propTypes.data,

    /**
     * Function to change the page
     *
     * @param {number}  direction  Whether to increment or decrement
     * @returns {void} No return
     */
    onPageChange: PropTypes.func.isRequired,

    /**
     * Function to update the app
     *
     * @param {string} appId  The app id to update
     * @param {string} name  The new name for the app
     * @returns {void} No return
     */
    onUpdateApp: PropTypes.func.isRequired,

    /** Boolean to indicate whether the app is loading. */
    isLoading: PropTypes.bool.isRequired,

    /** The current page of the app. */
    page: PropTypes.number.isRequired,

    /** The current app id. */
    appId: PropTypes.string.isRequired
  };

  render() {
    const {
      app: { logo, name },
      pageData,
      onPageChange,
      isLoading,
      page,
      onUpdateApp,
      appId
    } = this.props;

    return (
      <div>
        <img
          src={logo}
          alt={name}
          className="app__logo"
        />
        <Form
          appId={appId}
          onUpdateApp={onUpdateApp}
          initialValues={{ name }}
        />
        <h2>Users</h2>
        <Pagination
          page={page}
          pageData={pageData}
          onPageChange={onPageChange}
          isLoading={isLoading}
        />
        {pageData.length > 0 || isLoading ? (
          <Table
            data={pageData}
            isLoading={isLoading}
          />
        ) : (
          <div>There are no results</div>
        )}
        <Pagination
          page={page}
          pageData={pageData}
          onPageChange={onPageChange}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

export default App;
