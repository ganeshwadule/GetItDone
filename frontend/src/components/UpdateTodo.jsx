import React, { useState } from "react";
import "./todoPopup.css";
import axios from "axios";

const UpdateTodo = ({ todoId, title, desc, setIsTodoPopUp, data, setData }) => {
  const [todoTitle, setTodoTitle] = useState(title);
  const [todoDescription, setTodoDescription] = useState(desc);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const handleClose = () => {
    setIsTodoPopUp(false);
  };

  const updateTodo = async () => {
    try {
      if (todoTitle === "" || !todoTitle) {
        alert("Todo Title Can't be Empty ");
        return;
      }

      const response = await axios.put(
        `${BASE_URL}/api/v1/user/todo/${todoId}`,
        { title: todoTitle, description: todoDescription },
        { withCredentials: true }
      );
      const newData = data.map((todo) =>
        todo._id === todoId ? response.data.todo : todo
      );
      // console.log(response.data)
      setData(newData);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("reached here");
      setIsTodoPopUp(false);
    }
  };

  return (
    <div className="todo-section">
      <div className="data-section-container">
        <div className="data-section">
          <button
            className="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          >
            close
          </button>
          <div className="inputDataContainer">
            <div className="inputData">
              <div className="inputDiv">
                <label htmlFor="">Todo Title</label>
                <input
                  type="text"
                  name="title"
                  id=""
                  value={todoTitle}
                  onChange={(e) => setTodoTitle(e.target.value)}
                />
              </div>
              <div className="inputDiv">
                <label htmlFor="">Description</label>
                <textarea
                  name="message"
                  rows="6"
                  cols="50"
                  placeholder="Write todo's description here"
                  onChange={(e) => setTodoDescription(e.target.value)}
                  value={todoDescription}
                ></textarea>
              </div>
              <div className="inputDiv">
                <button onClick={updateTodo}>Update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTodo;
