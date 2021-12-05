import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [token, setToken] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userLogged = localStorage.getItem("user");
    setToken(JSON.parse(userLogged));
  }, []);

  const moving = () => {
    navigate("/tasks");
  };

  return (
    <div>
      {token ? (
        <button onClick={moving()}>go</button>
      ) : (
        <>
          <h1>To Do </h1>
          <button
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </button>
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default Landing;
