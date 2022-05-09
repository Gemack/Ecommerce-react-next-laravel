import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";
import { BsMessenger } from "react-icons/bs";
import img from "./placeholder.png";
import "./Navbar.scss";
import { StateContext } from "../../Context/Context";
import { UserContext } from "../../Context/UserContext";
import Menu from "@mui/material/Menu";
import { Tooltip } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const PF = "http://127.0.0.1:8000/";
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { darkMode, dispatch } = useContext(StateContext);
  const { user, dispatchUser } = useContext(UserContext);
  const Navigate = useNavigate();
  // ============================== Logout function =======================
  const logout = async () => {
    try {
      await axios.post("/api/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatchUser({ type: "LOGOUT" });
      Navigate("/");
    } catch {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatchUser({ type: "LOGOUT" });
      Navigate("/");
    }
  };
  return (
    <div className="navbar">
      <div className="wrapper">
        <Tooltip
          title="No Message"
          arrow
          placement="top-end"
          sx={{ width: 1400 }}
        >
          <div className="item">
            <BsMessenger size={35} color="lime" />
          </div>
        </Tooltip>
        <div
          className="item"
          onClick={() => dispatch({ type: "TOGGLE" })}
          style={{ cursor: "pointer" }}
        >
          <MdDarkMode size={38} color={darkMode ? "white" : "black"} />
        </div>
        <div className="item">
          {/* consitional rendering of the user img if user is logged in and not login */}
          {user ? (
            <img
              src={user.profile ? PF + user.profile : img}
              alt="MyProfilePicture"
              className="profilePix"
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            />
          ) : (
            <img
              src={img}
              alt="MyProfilePicture"
              className="profilePix"
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            />
          )}
          {/* ================================================================== */}
          <div>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={handleClose}>
                {" "}
                <Link
                  to="/profile"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  My Profile
                </Link>{" "}
              </MenuItem>
              <MenuItem onClick={() => logout()}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
