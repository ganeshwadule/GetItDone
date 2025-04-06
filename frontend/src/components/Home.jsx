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
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const { username } = useContext(AuthContext);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const addTodo = () => {
    alert("add a todo");
  };

  useEffect(() => {
    // console.log(tab)

    const getTodos = async () => {
      const response = await axios.get(`${BASE_URL}/api/v1/user/todo/${tab}`, {
        withCredentials: true,
      });

      if (response.data) {
        console.log(data);
        setData(response.data);
      }
    };
    getTodos();
  }, [tab,showPopup]);

  return (
    <div className="homeContainer">
      <div className="nav">
        <div className="logo">GetItDone</div>
        <div className="todoTypes">
          <span onClick={() => setTab("daily")}>Daily</span>
          <span onClick={() => setTab("weekly")}>weekly</span>
          <span onClick={() => setTab("custom")}>Custom</span>
        </div>
        <div className="userInfo">
          {username}
          <IoPersonCircleOutline
            onClick={() => setShowLogout(prev => !prev)}
            size={30}
            color="grey"
          />
          {showLogout && <Logout/>}
        </div>
      </div>
      <div className="hero">
        <div className="todo-container">
          <Todos data={data} />
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
