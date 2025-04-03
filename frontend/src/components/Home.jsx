import React, { useEffect, useState } from "react";
import "./home.css";
import Cookies from "js-cookie";
import axios from "axios";
import Todos from "./Todos"

const Home = () => {
  const [tab, setTab] = useState("daily");
  const [data,setData] = useState([]);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    // console.log(tab)

    const getTodos = async () => {
      const response = await axios.get(`${BASE_URL}/api/v1/user/todo/${tab}`, {
        withCredentials: true,
      });
      
      if(response.data){
        console.log(data);
        setData(response.data);
      }

    };
    getTodos();
  }, [tab]);

  return (
    <div className="homeContainer">
      <div className="nav">
        <div className="logo">GetItDone</div>
        <div className="todoTypes">
          <span onClick={() => setTab("daily")}>Daily</span>
          <span onClick={() => setTab("weekly")}>weekly</span>
          <span onClick={() => setTab("custom")}>Custom</span>
        </div>
        <div className="userInfo">Ganesh</div>
      </div>
      <div className="hero">
        <div className="todo-container">
          <Todos data={data} />
        </div>
      </div>
    </div>
  );
};

export default Home;
