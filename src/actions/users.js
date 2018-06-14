import fetch from "../utils/fetch";

/**
 * Sets up the request from the server
 * @param {string}  appId  The app id requesting for
 * @param {number}  offset  The current offset
 * @returns {{}} dispatch event
 */
const requestUsers = (appId, offset) => ({
  type: "USERS_SET",
  payload: {
    isLoading: true,
    appId,
    offset
  }
});

/**
 * Receives the users from the server
 * @param {array}  data  An array of the user data
 * @returns {{}} dispatch event
 */
const receiveUsers = data => ({
  type: "USERS_SET",
  payload: {
    isLoading: false,
    data
  }
});

/**
 * Fetches the users from the server
 * @param {string}  appId  The app id requesting for
 * @param {number}  offset  The current offset
 * @returns {void} No return
 */
const fetchUsers = (appId, offset) => async (dispatch, getState) => {
  const { app: { accessToken }, users: { data } } = getState();

  dispatch(requestUsers(appId, offset));

  const { error = "", users } = await fetch({
    endpoint: `apps/${appId}/users?offset=${offset}`,
    method: "get",
    accessToken,
  });

  if (error) {
    throw new Error(error);
  }

  dispatch(receiveUsers([
    ...data,
    ...users
  ]));
};

/**
 * Function to determine whether or not to fetch the users.
 * @param {boolean}  isLoading  Whether there is a current request
 * @param {string}  appId  The current app id
 * @param {number}  offset  The current offset
 * @param {string}  newAppId  The app id being requested for
 * @param {number}  newOffset  The offset requested for.
 * @returns {boolean} Whether to get the users.
 */
const shouldFetchUsers = ({ users: { isLoading, appId, offset } }, newAppId, newOffset) =>
  !isLoading && (appId !== newAppId || newOffset > offset);

/**
 * Function to get the users if required
 * @param {string}  appId  The current app id
 * @param {number}  page  The current page
 */
export const fetchUsersIfRequired = (appId, page) => (dispatch, getState) => {
  const offset = page * 25 - 25;

  if (shouldFetchUsers(getState(), appId, offset)) {
    dispatch(fetchUsers(appId, offset));
  }
};

/**
 * Function to reset users
 * @returns {{}} dispatch event.
 */
export const resetUsers = () => ({
  type: "USERS_SET",
  payload: {
    isLoading: false,
    data: [],
    offset: 0
  }
});
