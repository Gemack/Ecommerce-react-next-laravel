export const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      return {
        user: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        user: false,
      };
    }
    case "UPDATE": {
      return {
        user: action.payload,
      };
    }
    default:
      return state;
  }
};
