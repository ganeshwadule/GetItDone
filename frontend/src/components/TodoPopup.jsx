import React, { useState } from "react";
import "./todoPopup.css";
import axios from "axios"

const TodoPopup = ({ showPopup, setShowPopup , tab }) => {
  const [todoTitle, setTodoTitle] = useState();
  const [todoDescription, setTodoDescription] = useState();

 const BASE_URL = import.meta.env.VITE_BASE_URL;

  const addTodo=async ()=>{
  
     try {
       const response = await axios.post(`${BASE_URL}/api/v1/user/todo`,{title:todoTitle,description:todoDescription,todoType:tab},{withCredentials:true});
        setShowPopup(false);
     } catch (error) {
        
        console.log(error)
     }

  }

  const handleClose = () => {
    setShowPopup(!showPopup);
  };
  return (
    <div className="todo-section">
      <div className="data-section-container">
        <div className="data-section">
          <button className="button" onClick={handleClose}>
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
                ></textarea>
              </div>
              <div className="inputDiv">
                <button onClick={addTodo}>Add Todo</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoPopup;
