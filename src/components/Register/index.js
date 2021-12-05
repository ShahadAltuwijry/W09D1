import React, { useState, useEffect } from "react";
import "./style.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  //   const [reg, setReg] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [role, setRole] = useState("61a60b7752ebd90581f0ff06");
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  console.log(BASE_URL);

  const getUsers = async () => {
    const user = await axios.get(`${BASE_URL}/users`);
    setAllUsers(user.data);
    // console.log(user.data);
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  const signUp = async (e) => {
    e.preventDefault();
    let exist = false;
    // console.log("here1");

    // eslint-disable-next-line
    allUsers.filter((user) => {
      if (user.email === email) {
        exist = true;
        // console.log("sec Here");
      }
    });

    if (exist) {
      //   console.log("hereee");
      Swal.fire({
        title: "Email already registred, use another email or Log in please.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      // navigate("/signin");
    }
    if (!exist) {
      const regData = {
        email: email,
        password: password,
        role,
      };
      // eslint-disable-next-line
      const res = await axios
        .post(`${BASE_URL}/regster`, regData)
        .then((res) => console.log(res));

      //   localStorage.setItem("user", JSON.stringify(regData));
      navigate("/login");
    }
  };

  return (
    <div className="mainRegDiv">
      {/* <button
        onClick={() => {
          setReg(!reg);
        }}
      >
        Register
      </button> */}
      {/* {reg ? ( */}
      <div className="regFormDiv">
        <h1> Registration</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signUp}>Register</button>
      </div>
      {/* ) : (
        ""
      )} */}
    </div>
  );
};

export default Register;
