import React, { useState, useEffect } from "react";
import "./style.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [reg, setReg] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  }, []);

  const signUp = async (e) => {
    e.preventDefault();
    let exist = false;

    // eslint-disable-next-line
    allUsers.filter((user) => {
      if (user.email === email) {
        exist = true;
      }
    });

    if (exist) {
      Swal.fire({
        title: "اسم المستخدم او البريد مسجل مسبقاً، الرجاء تسجيل الدخول",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    //   navigate("/signin");
    }
    if (!exist) {
      const regData = {
        email: email,
        password: password,
      };
      // eslint-disable-next-line
      const res = await axios
        .post(`${BASE_URL}/regster`, regData)
        .then((res) => console.log(res));

      localStorage.setItem("user", JSON.stringify(regData));
      navigate("/tasks");
    }
  };

  return (
    <div className="mainRegDiv">
      <button
        onClick={() => {
          setReg(!reg);
        }}
      >
        Register
      </button>
      {reg ? (
        <div className="regFormDiv">
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
      ) : (
        ""
      )}
    </div>
  );
};

export default Register;
