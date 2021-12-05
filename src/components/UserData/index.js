import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const UserData = () => {
  const [userEmail, setUserEmail] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState([]);
  const [get, setGet] = useState(false);
  const [getTask, setGetTask] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [userTasks, setUserTasks] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  //to set all that needed from localstorage
  const user = () => {
    const userLogged = localStorage.getItem("user");
    setToken(JSON.parse(userLogged));
    const data = localStorage.getItem("email");
    setUserEmail(JSON.parse(data));
    const role = localStorage.getItem("role");
    setRole(JSON.parse(role));
  };

  useEffect(() => {
    user();
  }, []);

  //to get all the users
  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/adminAll`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return setAllUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //   to get the users
  useEffect(() => {
    getAllUsers();
    getUserTasks();
  }, [role]);

  // console.log(allUsers);

  //to get all users tasks
  const getUserTasks = async (_id) => {
    try {
      const res = await axios.get(`${BASE_URL}/adminget/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(res.data);
      setUserTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //to toggle the all users button
  const getting = () => {
    setGet(!get);
    console.log(get);
  };

  //log out button
  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="userDataDiv">
      <h1>user Email</h1>
      <h2>{userEmail}</h2>
      {role === "61a60b6d52ebd90581f0ff04" ? (
        <div className="adminDiv">
          <h3 className="roleH">Admin</h3>
          <button onClick={getting}>Get All Users</button>
          {!get ? (
            ""
          ) : (
            <>
              <div className="allUsersDiv">
                <ul className="userList">
                  {allUsers.map((user, i) => (
                    <li key={i} className="userMail">
                      {user.email}
                      <button onClick={() => getUserTasks(user._id)}>
                        user tasks
                      </button>
                      {/* {userTasks ? (
                        <div className="userTasks">
                          <ul className="taskList">
                          {userTasks.forEach((task, i) => {
                            <p key={i} className="userTask">
                              {task} "."
                            </p>;
                          })}
                          </ul>
                        </div>
                      ) : (
                        "."
                      )} */}
                    </li>
                  ))}
                </ul>
                <h2>nice!</h2>
              </div>
            </>
          )}
        </div>
      ) : (
        <h3 className="roleH">User</h3>
      )}
      <button className="outBtn" onClick={logOut}>
        log out
      </button>
    </div>
  );
};

export default UserData;
