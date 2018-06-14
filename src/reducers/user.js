const initialState = {
  email: ""
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case "USER_SET": {
      return {
        ...state,
        ...payload
      };
    }
    default:
      return state;
  }
};

export default user;