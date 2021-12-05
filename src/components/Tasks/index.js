import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      const res = await axios.get(`${BASE_URL}/Tasks`, {
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
    } catch (error) {}
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
                ? tasks.map((task) => {
                    return (
                      <div key={task._id}>
                        <p key={task._id}>{task.name}</p>
                      </div>
                    );
                  })
                : ""}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Tasks;
