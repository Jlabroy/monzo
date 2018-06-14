const initialState = {
  data: [],
  isLoading: false,
  appId: null,
  offset: 0
};

const users = (state = initialState, { type, payload }) => {
  switch (type) {
    case "USERS_SET": {
      return {
        ...state,
        ...payload
      };
    }
    default:
      return state;
  }
};

export default users;