import { createContext, useReducer } from "react";
import { UserReducer } from "../Context/UserReducer";

const Admin = localStorage.getItem("user");
const user = JSON.parse(Admin);
const INITIAL_STATE = {
  user: user ? user : null,
};

export const UserContext = createContext(INITIAL_STATE);

export const UserContextProvider = ({ children }) => {
  const [state, dispatchUser] = useReducer(UserReducer, INITIAL_STATE);
  return (
    <UserContext.Provider value={{ user: state.user, dispatchUser }}>
      {children}
    </UserContext.Provider>
  );
};
