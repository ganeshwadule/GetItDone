import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const Todo = ({ title, todoId, isChecked , data , setData}) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  async function deleteTodo() {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/user/todo/${todoId}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const updatedData = data.filter((todo) => todo._id !== todoId);
        setData(updatedData); 
        console.log(response.data.message);
      }
      
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#d1d8e0",
        padding: "20px 20px",
        borderRadius: "9px",
        display: "flex",
        justifyContent: "space-between",
        width: 351,
      }}
    >
      <span>{title}</span>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <input type="checkbox" name={todoId} id={todoId} checked={isChecked} />
        <MdDelete size={20} color="black" onClick={deleteTodo} />
      </div>
    </div>
  );
};

export default Todo;
