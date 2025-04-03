import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import ProtectedRoute from "./components/ProtectedRoute";
import Cookies from "js-cookie";
function App() {
  const location = useLocation();

  // const Token = Cookies.get("userAuth"); // ✅ Correct way

  //  if(Token)setToken(Token);
  const isAuthenticated = () => {
    return !!Cookies.get("userAuth");
  };

  useEffect(() => {
    if (location.pathname === "/home") {
      isAuthenticated();
      // console.log(isAuthenticated());
      console.log("path changed");
    }
  }, [location.pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/home"
          element={<ProtectedRoute isAuthenticated={isAuthenticated()} />}
        />
      </Routes>
    </>
  );
}

export default App;
