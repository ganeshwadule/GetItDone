import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
