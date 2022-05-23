import { useState } from "react";
import axios from "axios";
import "./user.scss";
import Navbar from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/SideBar/Sidebar";
import { AdminTable } from "../../Components/Tables/Table";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UsersPage = () => {
  const [reg, setReg] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    phone: "",
    password_confirmation: "",
  });

  const onChange = (e) => {
    setReg({ ...reg, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: reg.name,
      email: reg.email,
      password: reg.password,
      username: reg.username,
      phone: reg.phone,
      password_confirmation: reg.password_confirmation,
    };

    try {
      await axios.get("/sanctum/csrf-cookie");
      await axios.post("/api/register", data);
      Swal.fire("Created", "New Admin user has been created by you", "success");
    } catch (err) {
      if (err.response.status === 401) {
        toast("Token expired please login to get a new token", {
          position: "top-right",
          autoClose: 5000,
          type: "error",
        });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.reload();
      } else {
        toast(
          "User not Created Check entry again, and make sure Password and Confirmed Password are matched",
          {
            position: "bottom-center",
            autoClose: 4000,
            type: "error",
            className: "toasty-error",
          }
        );
      }
    }
  };

  return (
    <div className="users-page">
      <Sidebar />
      <div className="users-page-container">
        <Navbar />
        <div className="top">
          <h3>Add A User</h3>
        </div>
        <div className="center">
          <div className="right">
            <form onSubmit={onSubmit}>
              <div className="formInput">
                <label>FullName</label>
                <input
                  type="text"
                  name="name"
                  onChange={onChange}
                  value={reg.name}
                />
              </div>
              <div className="formInput">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={onChange}
                  value={reg.username}
                />
              </div>
              <div className="formInput">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  onChange={onChange}
                  value={reg.email}
                />
              </div>
              <div className="formInput">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  onChange={onChange}
                  value={reg.phone}
                />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={onChange}
                  value={reg.password}
                />
              </div>
              <div className="formInput">
                <label>Comfirm Password</label>
                <input
                  type="password"
                  name="password_confirmation"
                  onChange={onChange}
                  value={reg.password_confirmation}
                />
              </div>
              <button type="submit">send</button>
            </form>
          </div>
        </div>
        <div className="bottom">
          <h3>Admin Users</h3>
          <div className="UserList">
            <AdminTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
