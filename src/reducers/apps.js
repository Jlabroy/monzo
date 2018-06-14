const initialState = {
  data: [],
  offset: 0,
  isLoading: false
};

const apps = (state = initialState, { type, payload }) => {
  switch (type) {
    case "APPS_SET": {
      return {
        ...state,
        ...payload
      };
    }
    default:
      return state;
  }
};

export default apps;