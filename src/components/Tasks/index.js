import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [id, setId] = useState("");
  const [token, setToken] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const addToken = async () => {
    const userLogged = await localStorage.getItem("user");
    const id = await localStorage.getItem("id");
    setToken(JSON.parse(userLogged));
    setId(JSON.parse(id));
  };

  useEffect(() => {
    addToken();
  }, []);

  const moving = () => {
    navigate("/");
  };

  const getTasks = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/allTasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      //   console.log(res);
      setTasks(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line
  }, [token]);

  const addTask = async (e) => {
    e.preventDefault();
    try {
      let newTask = e.target.addTask.value;
      console.log(newTask);
      console.log(token);
      const res = await axios.post(`${BASE_URL}/task/${id}`, {
        name: newTask,
        // headers: { Authorization: `Bearer ${token}` },
      });

      //   console.log(res);
      setTasks(res.data);
      getTasks();
    } catch (error) {
      console.log(error.message);
    }
  };

  const completed = async (_id) => {
    try {
      // eslint-disable-next-line
      let res1 = await axios.put(`${BASE_URL}/check/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res1);
      getTasks();
    } catch (error) {
      console.log(error.message);
    }
  };

  const delTask = async (_id) => {
    try {
      // eslint-disable-next-line
      let res = await axios.delete(`${BASE_URL}/delete/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getTasks();
    } catch (error) {
      console.log(error.message);
    }
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const userInfo = () => {
    navigate("/userInfo");
  };

  //here we get tasks by registered user id that i already placed in local storage

  return (
    <div>
      {!token ? (
        //           <>
        //   <h1>you must login or register first</h1>
        //   <button onClick={() => moving()}>Go</button>
        // </>
        <button onClick={moving()}>go</button>
      ) : (
        <div className="taskMainDiv">
          <h1>Tasks</h1>
          {tasks.length < 0 ? (
            <h1>no tasks found</h1>
          ) : (
            <>
              <form onSubmit={addTask}>
                <input
                  required
                  type="text"
                  name="addTask"
                  placeholder="add task"
                />
                <button type="submit">Add</button>
              </form>
              {tasks.length > 0
                ? tasks.map((task, i) => {
                    return (
                      <div key={task.name} className="taskDiv">
                        <p
                          className={!task.isCompleted ? "tasksP" : "taskDone"}
                          key={task._id}
                        >
                          {task.name}
                        </p>
                        <div className="btnsDiv">
                          <button
                            key={i + 3}
                            className="btn"
                            id="delBtn"
                            onClick={() => delTask(task._id)}
                          >
                            <img
                              className="iconImg"
                              src="https://img.icons8.com/small/32/000000/filled-trash.png"
                              alt="icon"
                            />
                          </button>
                          <button
                            key={i}
                            className="btn"
                            id="checkBtn"
                            onClick={() => completed(task._id)}
                          >
                            <img
                              className="iconImg"
                              src="https://img.icons8.com/ios-glyphs/30/000000/check-all.png"
                              alt="icon"
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })
                : ""}
            </>
          )}
          <button className="outBtn" onClick={logOut}>
            log out
          </button>
          <button className="outBtn" onClick={userInfo}>
            User Info
          </button>
        </div>
      )}
    </div>
  );
};

export default Tasks;
