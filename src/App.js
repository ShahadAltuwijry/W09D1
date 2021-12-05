import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Tasks from "./components/Tasks";
import Landing from "./components/Landing";
// import { useNavigate } from "react-router-dom";

function App() {
  // const [token, setToken] = useState("");
  // const navigate = useNavigate();

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/tasks" element={<Tasks />} />
      </Routes>
    </div>
  );
}

export default App;
