import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { StateContextProvider } from "./Context/Context";
import { UserContextProvider } from "./Context/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StateContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </StateContextProvider>
  </React.StrictMode>
);
