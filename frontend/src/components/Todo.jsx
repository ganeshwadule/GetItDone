import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import UpdateTodo from "./updateTodo";
import "./todo.css";

const Todo = ({ title, desc, todoId, isDone, data, setData }) => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [checked, setChecked] = useState(isDone);

  const [isTodoPopup, setIsTodoPopUp] = useState(false);
  console.log(isDone);
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

  const handleCheck = async (newChecked) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/user/todo/${todoId}`,
        { title: title, description: desc, isDone: newChecked },
        { withCredentials: true }
      );
      const newData = data.map((todo) =>
        todo._id === todoId ? response.data.todo : todo
      );
      console.log(response.data);
      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async () => {
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
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        onClick={(e) => {
          e.stopPropagation();
          todoInfo();
        }}
        className={!checked ? "todo-card" : "todoChecked"}
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
            className="checkBox"
            type="checkbox"
            name={todoId}
            id={todoId}
            checked={checked}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              const newChecked = e.target.checked;
              setChecked(newChecked);
              handleCheck(newChecked);
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
