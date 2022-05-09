export const StateReducer = (state, action) => {
  switch (action.type) {
    case "LIGHT": {
      return {
        darkMode: false,
        user: true,
      };
    }
    case "DARK": {
      return {
        darkMode: true,
        user: true,
      };
    }
    case "TOGGLE": {
      return {
        darkMode: !state.darkMode,
        user: true,
      };
    }
    case "LOGIN": {
      return {
        user: action.payload,
      };
    }
    default:
      return state;
  }
};
