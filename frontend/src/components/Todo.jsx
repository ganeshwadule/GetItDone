import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import UpdateTodo from "./UpdateTodo";

const Todo = ({ title, desc, todoId, isChecked, data, setData }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const [isTodoPopup, setIsTodoPopUp] = useState(false);

  const todoInfo = () => {
    setIsTodoPopUp(true);
  };

  const confirmDelete = () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (!shouldDelete) return;

    // Proceed with delete
    deleteTodo();
  };

  async function deleteTodo() {
    try {
      // const data = alert("do you want to delete this todo")
      // console.log(data)
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
      onClick={(e) => {
        todoInfo();
      }}
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
        <input
          type="checkbox"
          name={todoId}
          id={todoId}
          checked={isChecked}
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
        <MdDelete
          size={20}
          color="black"
          onClick={(e) => {
            confirmDelete();
            e.stopPropagation();
          }}
        />
      </div>

      {isTodoPopup && (
        <UpdateTodo
          data={data}
          setData={setData}
          title={title}
          desc={desc}
          todoId={todoId}
          isTodoPopup={isTodoPopup}
          setIsTodoPopUp={setIsTodoPopUp}
        />
      )}
    </div>
  );
};

export default Todo;
