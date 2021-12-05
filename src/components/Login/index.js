import React, { useState } from "react";
import "./style.css";
// import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const signIn = async (e) => {
    e.preventDefault();

    const res = await axios.post(`${BASE_URL}/login`, {
      email: email,
      password: password,
    });
    // console.log(res);
    localStorage.setItem("user", JSON.stringify(res.data.token));
    // localStorage.setItem("fullUser", JSON.stringify(res.data));
    localStorage.setItem("id", JSON.stringify(res.data.result._id));
    localStorage.setItem("email", JSON.stringify(res.data.result.email));
    localStorage.setItem("role", JSON.stringify(res.data.result.role));

    navigate("/tasks");
  };

  return (
    <div className="logMainDiv">
      <h1> Log in</h1>

      <input
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Login</button>
    </div>
  );
};

export default Login;
