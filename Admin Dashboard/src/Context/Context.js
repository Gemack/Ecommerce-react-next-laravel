import { createContext, useReducer } from "react";
import { StateReducer } from "./Reducer";

const darkMode = localStorage.getItem("darkMode");

const INITIAL_STATE = {
  darkMode: darkMode ? darkMode : false,
};

export const StateContext = createContext(INITIAL_STATE);

export const StateContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(StateReducer, INITIAL_STATE);
  return (
    <StateContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};
