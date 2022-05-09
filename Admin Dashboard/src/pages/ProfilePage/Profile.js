import { useState, useContext } from "react";
import { ListTable2 } from "../../Components/Tables/Table";
import Sidebar from "../../Components/SideBar/Sidebar";
import Chart from "../../Components/Chart/Chart";
import { AiFillFileAdd } from "react-icons/ai";
import IMG from "../../Components/Navbar/placeholder.png";
import { UserContext } from "../../Context/UserContext";
import "./Profile.scss";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Profile = () => {
  const [file, setFile] = useState("");
  const { user, dispatchUser } = useContext(UserContext);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    username: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  const onChange = (e) => {
    e.preventDefault();
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const PF = "http://127.0.0.1:8000/";
  const fileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile", file);
    formData.append("name", profile.name);
    formData.append("email", profile.email);
    formData.append("password", profile.password);
    formData.append("username", profile.username);
    formData.append("phone", profile.phone);
    formData.append("password_confirmation", profile.password_confirmation);
    try {
      const res = await axios.post(`/api/user/${user.id}`, formData);
      Swal.fire(
        "Created",
        "Your Data has been updated successfully please login with your new credientials",
        "success"
      );
      dispatchUser({ type: "UPDATE", payload: res.data.user });
      console.log(res);
    } catch {
      toast("User Update not successfull please check entry and try again", {
        position: "top-center",
        autoClose: 4000,
        type: "error",
        className: "toasty-error",
      });
    }
  };

  return (
    <div className="profile-page">
      <Sidebar />
      <div className="profile-page-container">
        <div className="top">
          <div className="left">
            <h4>Your Information</h4>
            <div className="item">
              {user.profile ? (
                <img
                  src={user.profile ? PF + user.profile : IMG}
                  alt="my Profile"
                  className="ItemImg"
                />
              ) : (
                <img src={IMG} alt="my Profile" className="ItemImg" />
              )}
              <div className="details">
                <h5 className="title">{user.name}</h5>
                <div className="detailItem">
                  <span className="itemKey">Username:</span>
                  <span className="itemValue">{user.username}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{user.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">4th Avenue Elon st Lokoja</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="Your Last Six Month Sales" />
          </div>
        </div>
        <div className="center">
          <div className="left">
            {user.profile ? (
              <img
                src={file ? URL.createObjectURL(file) : PF + user.profile}
                alt={IMG}
              />
            ) : (
              <img src={file ? URL.createObjectURL(file) : IMG} alt={IMG} />
            )}
          </div>
          <div className="right">
            <h2 style={{ color: "lime", fontSize: "2rem" }}>Update Profile</h2>
            <form onSubmit={onSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Profile Picture
                  <AiFillFileAdd
                    style={{ cursor: "pointer", color: "lime" }}
                    size={30}
                  />
                </label>
                <input
                  type="file"
                  id="file"
                  name="profile"
                  style={{ display: "none" }}
                  onChange={fileChange}
                />
              </div>
              <div className="formInput">
                <label>FullName</label>
                <input
                  type="text"
                  name="name"
                  onChange={onChange}
                  value={profile.name}
                />
              </div>
              <div className="formInput">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={onChange}
                  value={profile.username}
                />
              </div>
              <div className="formInput">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  onChange={onChange}
                  value={profile.email}
                />
              </div>
              <div className="formInput">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  onChange={onChange}
                  value={profile.phone}
                />
              </div>
              <div className="formInput">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={onChange}
                  value={profile.password}
                />
              </div>
              <div className="formInput">
                <label>Comfirm Password</label>
                <input
                  type="password"
                  name="password_confirmation"
                  onChange={onChange}
                  value={profile.password_confirmation}
                />
              </div>

              <button type="submit">send</button>
            </form>
          </div>
        </div>
        <div className="listTable">
          <h3>All Your Latest Transactions</h3>
          <ListTable2 />
        </div>
      </div>
    </div>
  );
};

export default Profile;
