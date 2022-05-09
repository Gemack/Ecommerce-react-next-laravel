import { useContext } from "react";
import { GiProgression } from "react-icons/gi";
import { FaProductHunt, FaUserAlt, FaUsers, FaHotjar } from "react-icons/fa";
import { AiFillSetting } from "react-icons/ai";
import { BiLogOut, BiTransfer } from "react-icons/bi";
import { MdOutlineDashboard } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import "./Sidebar.scss";
import { StateContext } from "../../Context/Context";
const Sidebar = () => {
  const { dispatch } = useContext(StateContext);
  const { dispatchUser } = useContext(UserContext);
  // The following code using the useLocation hooks from react router dom will apply style to current tab
  const Navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  // ======================================================================
  // ============================== Log user out function ==================================
  const logout = async () => {
    try {
      await axios.post("/api/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatchUser({ type: "LOGOUT" });
      Navigate("/");
    } catch {}
  };
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Clean Hand</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Link
            to="/home"
            style={{
              color: "#222",
              textDecoration: "none",
            }}
          >
            <li className={splitLocation[1] === "" ? "active" : ""}>
              <MdOutlineDashboard className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/product" style={{ color: "#222", textDecoration: "none" }}>
            <li className={splitLocation[1] === "product" ? "active" : ""}>
              <FaProductHunt className="icon" />
              <span>Product</span>
            </li>
          </Link>
          <Link to="/user" style={{ color: "#222", textDecoration: "none" }}>
            <li className={splitLocation[1] === "user" ? "active" : ""}>
              <FaUserAlt className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link
            to="/customer"
            style={{ color: "#222", textDecoration: "none" }}
          >
            <li className={splitLocation[1] === "customer" ? "active" : ""}>
              <FaUsers className="icon" />
              <span>Customers</span>
            </li>
          </Link>
          <Link to="/hot" style={{ color: "#222", textDecoration: "none" }}>
            <li className={splitLocation[1] === "hot" ? "active" : ""}>
              <FaHotjar className="icon" />
              <span>Hot Sales</span>
            </li>
          </Link>

          <Link
            to="/transaction"
            style={{ color: "#222", textDecoration: "none" }}
          >
            <li className={splitLocation[1] === "transaction" ? "active" : ""}>
              <BiTransfer className="icon" />
              <span>Transactions</span>
            </li>
          </Link>
          <Link to="/stat" style={{ color: "#222", textDecoration: "none" }}>
            <li className={splitLocation[1] === "stat" ? "active" : ""}>
              <GiProgression className="icon" />
              <span>Stats</span>
            </li>
          </Link>
          <Link to="/profile" style={{ color: "#222", textDecoration: "none" }}>
            <li className={splitLocation[1] === "profile" ? "active" : ""}>
              <AiFillSetting className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li onClick={() => logout()}>
            <BiLogOut className="icon" />
            <span>Sign-out</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
