import { useState, useContext } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import "./LoginPage.scss";

const LoginPage = () => {
  const { dispatchUser } = useContext(UserContext);
  const [log, setlog] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setlog({ ...log, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: log.email,
      password: log.password,
    };

    try {
      await axios.get("/sanctum/csrf-cookie");
      const res = await axios.post("/api/login", data);
      dispatchUser({ type: "LOGIN", payload: res.data.user });
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-login">
      <div className="formContainer">
        <h1>
          {" "}
          <AiOutlineLogin /> Admin Login
        </h1>
        <form onSubmit={onSubmit}>
          <div className="formInput">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              onChange={onChange}
              value={log.email}
            />
          </div>
          <div className="formInput">
            <label>password</label>
            <input
              type="password"
              name="password"
              onChange={onChange}
              value={log.password}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
