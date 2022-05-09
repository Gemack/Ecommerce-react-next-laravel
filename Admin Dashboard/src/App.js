import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/ProductPage/ProductPage";
import "react-circular-progressbar/dist/styles.css";
import "./Styles/Dark.scss";
import LoginPage from "./pages/LoginPage/LoginPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import CustomerPage from "./pages/CustomerPage/CustomerPage";
import HotSalePage from "./pages/HotSalePage/HotSalePage";
import TransactionPage from "./pages/TransactionPage/TransactionPage";
import StatPage from "./pages/StatPage/StatPage";
import Profile from "./pages/ProfilePage/Profile";
import { useContext } from "react";
import { StateContext } from "./Context/Context";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "./Context/UserContext";

axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

function App() {
  const { darkMode } = useContext(StateContext);
  const { user } = useContext(UserContext);
  localStorage.setItem("darkMode", darkMode);
  localStorage.setItem("user", JSON.stringify(user));

  return (
    <div className={darkMode ? "App Dark" : "App"}>
      <Router>
        <ToastContainer />
        <Routes>
          {!user && <Route path="/" element={<LoginPage />} />}
          {user && (
            <>
              <Route path="/home" element={<HomePage />} />
              <Route path="/product" element={<ProductPage />} />
              <Route path="/user" element={<UsersPage />} />
              <Route path="/customer" element={<CustomerPage />} />
              <Route path="/hot" element={<HotSalePage />} />
              <Route path="/transaction" element={<TransactionPage />} />
              <Route path="/stat" element={<StatPage />} />
              <Route path="/profile" element={<Profile />} />
            </>
          )}
          <Route path="*" element={<Navigate to={user ? "/home" : "/"} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
