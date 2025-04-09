import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import axios from "axios";

const Todos = ({ tab, showPopup }) => {
  const [data, setData] = useState([]);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

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
  }, [tab, showPopup]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {data.map((todo, index) => (
        <Todo
          data={data}
          setData={setData}
          key={todo._id}
          todoId={todo._id}
          title={todo.title}
          desc={todo.description} 
          isDone = {todo.isDone}
        />
      ))}
    </div>
  );
};

export default Todos;
