import React, { useContext, useEffect, useState } from "react";
import "./home.css";
import Cookies from "js-cookie";
import axios from "axios";
import Todos from "./Todos";
import plusIcon from "../assets/plus.png";
import TodoPopup from "./TodoPopup";
import { AuthContext } from "../hooks/AuthContextProvider";
import { IoPersonCircleOutline } from "react-icons/io5";
import Logout from "./Logout";

const Home = () => {
  const [tab, setTab] = useState("daily");

  const [showPopup, setShowPopup] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const { username } = useContext(AuthContext);

  return (
    <div className="homeContainer">
      <div className="nav">
        <div className="logo">GetItDone</div>
        <div className="todoTypes">
          <span className= {tab === "daily" ? "active" : null} onClick={() => setTab("daily")}>Daily</span>
          <span className= {tab === "weekly" ? "active" : null} onClick={() => setTab("weekly")}>weekly</span>
          <span className= {tab === "custom" ? "active" : null} onClick={() => setTab("custom")}>Custom</span>
        </div>
        <div className="userInfo">
          {username}
          <IoPersonCircleOutline
            onClick={() => setShowLogout((prev) => !prev)}
            size={30}
            color="grey"
          />
          {showLogout && <Logout />}
        </div>
      </div>
      <div className="hero">
        <div className="todo-container">
          <Todos tab={tab} showPopup={showPopup} />
        </div>
      </div>
      <div className="addButton">
        <img src={plusIcon} alt="" onClick={() => setShowPopup(!showPopup)} />
      </div>
      {showPopup && (
        <TodoPopup
          tab={tab}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
        />
      )}
    </div>
  );
};

export default Home;
