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
  // eslint-disable-next-line
  const [userTasks, setUserTasks] = useState([{}]);
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
    // getUserTasks();
    // eslint-disable-next-line
  }, [role]);

  // console.log(allUsers);

  //to get all users tasks
  //   const getUserTasks = async (_id) => {
  //     try {
  //       const res = await axios.get(`${BASE_URL}/adminget/${_id}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });

  //       for (let i = 0; i < res.data.length; i++) {
  //         // console.log(res.data[i].name);
  //         setUserTasks(res.data[i].name);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   console.log(userTasks);

  //to toggle the all users button
  const getting = () => {
    setGet(!get);
    console.log(get, "get");
  };

  //   const gettingTask = () => {
  //     setGetTask(!getTask);
  //     console.log(getTask, "get task");
  //   };

  //log out button
  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const taskPage = () => {
    navigate("/tasks");
  };

  return (
    <div
      className="userDataDiv"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>user Page</h1>
      <div
        style={{
          width: "43%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <h2 style={{ color: "black", fontSize: "30px" }}>user email: </h2>
        <h2 style={{ color: "rgba(0, 0, 0, 0.7)" }}>{userEmail}</h2>
      </div>
      {role === "61a60b6d52ebd90581f0ff04" ? (
        <div className="adminDiv">
          <h3 className="roleH"> Admin</h3>
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
                      {/* <button
                        key={i + 2}
                        onClick={() => {
                          getUserTasks(user._id);
                          gettingTask();
                        }}
                      >
                        user tasks
                      </button> */}
                    </li>
                  ))}
                </ul>
                {/* {getTask ? (
                  <div className="userTasks">
                    <ul className="taskList">
                      {userTasks.map((ele, i) => {
                        <li className="userTask">{ele[i]}</li>;
                      })}
                      <li>{userTasks}</li>
                    </ul>
                    <h1>here</h1>
                  </div>
                ) : (
                  "no tasks shown"
                )} */}
              </div>
            </>
          )}
        </div>
      ) : (
        <h3 className="roleH"> User</h3>
      )}
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          className="btn"
          onClick={taskPage}
          style={{ width: "90px", marginTop: "30px", marginRight: "10px" }}
        >
          tasks page
        </button>
        <button className="outBtn" onClick={logOut}>
          log out
        </button>
      </div>
    </div>
  );
};

export default UserData;
