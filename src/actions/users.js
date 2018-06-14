import fetch from "../utils/fetch";

const requestUsers = (appId, offset) => ({
  type: "USERS_SET",
  payload: {
    isLoading: true,
    appId,
    offset
  }
});

const receiveUsers = data => ({
  type: "USERS_SET",
  payload: {
    isLoading: false,
    data
  }
});

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

const shouldFetchUsers = ({ users: { isLoading, data, appId, offset } }, newAppId, newOffset) =>
  !isLoading && (appId !== newAppId || newOffset > offset);

export const fetchUsersIfRequired = (appId, page) => (dispatch, getState) => {
  const offset = page * 25 - 25;

  if (shouldFetchUsers(getState(), appId, offset)) {
    dispatch(fetchUsers(appId, offset));
  }
};

export const resetUsers = () => ({
  type: "USERS_SET",
  payload: {
    isLoading: false,
    data: [],
    offset: 0
  }
});
