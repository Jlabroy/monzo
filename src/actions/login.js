import fetch from "../utils/fetch";

/**
 * Function to set the apps access token
 * @param {string}  accessToken  An access token
 * @returns {{}} dispatch event
 */
export const setAccessToken = accessToken => ({
  type: "APP_SET",
  payload: {
    accessToken
  }
});

/**
 * Function to set the users email address
 * @param {string}  email  The users email address.
 * @returns {{}} dispatch event
 */
const setEmail = email => ({
  type: "USER_SET",
  payload: {
    email
  }
});

/**
 * Authorises the email and password combination and dispatches events.
 * @param {string}  email  A users email address
 * @param {string}  password  A users password.
 */
export const login = ({ email, password }) => async dispatch => {
  const { accessToken, error = "" } = await fetch({
    endpoint: "login",
    email,
    password
  });

  if (error) {
    throw new Error(error);
  }

  dispatch(setAccessToken(accessToken));
  dispatch(setEmail(email));
};
