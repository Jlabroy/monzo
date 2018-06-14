import fetch from "../utils/fetch";

/**
 * Function to set up the app request
 * @returns {{}} dispatch event
 */
const requestApps = () => ({
  type: "APPS_SET",
  payload: {
    isLoading: true
  }
});

/**
 * Function to receive the app data.
 * @param {array}  data  Array of all the apps.
 * @returns {{}} dispatch event
 */
const receiveApps = data => ({
  type: "APPS_SET",
  payload: {
    isLoading: false,
    data
  }
});

/**
 * Function to fetch all the apps from the server.
 *
 * @returns {void} No return.
 */
const fetchApps = () => async (dispatch, getState) => {
  const { app: { accessToken } } = getState();

  dispatch(requestApps());

  const { error = "", apps } = await fetch({
    endpoint: "apps",
    method: "get",
    accessToken,
  });

  if (error) {
    throw new Error(error);
  }

  dispatch(receiveApps(apps));
};

/**
 * Function which determines whether or not to get the apps
 * @param {bool}  isLoading  Whether the app is currently loading
 * @param {array}  data  The current list of data
 * @returns {bool} Whether or not to get apps
 */
const shouldFetchApps = ({ apps: { isLoading, data } }) =>
  !isLoading && data.length === 0;

/**
 * Function which will get the apps if required.
 * @returns {void} No return
 */
export const fetchAppsIfRequired = () => (dispatch, getState) => {
  if (shouldFetchApps(getState())) {
    dispatch(fetchApps());
  }
};

/**
 * Function which sets an app in the reducer.
 * @param {{}}  app  The new app data
 * @param {array}  currentApps  A list of the current apps
 * @returns {{}} An updated list of apps.
 */
const setApp = ({ app, currentApps }) => {
  const data = currentApps.map(currentApp => {
    const { id: currentId } = currentApp;
    const { id } = app;

    if (currentId === id) {
      return app;
    }

    return currentApp;
  });

  return {
    type: "APPS_SET",
    payload: {
      data
    }
  };
};

/**
 * Function which updates an app
 * @param {string}  appId  The app id to update
 * @param {{}}  params  Parameters to update
 * @returns {void} No return
 */
export const updateApp = ({ appId, ...params }) => async (dispatch, getState) => {
  const { app: { accessToken }, apps: { data } } = getState();

  const { error = "", app } = await fetch({
    endpoint: `apps/${appId}`,
    method: "put",
    accessToken,
    ...params
  });

  if (error) {
    throw new Error(error);
  }

  dispatch(setApp({ app, currentApps: data, ...params }));
};
