import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Tasks from "./components/Tasks";

function App() {
  return (
    <div className="App">
      <Login />
      <Register />
      <Routes>
        <Route exact path="/Tasks" element={<Tasks />} />
      </Routes>
    </div>
  );
}

export default App;
