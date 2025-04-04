import React from "react";
import "./todoPopup.css";

const TodoPopup = ({ showPopup, setShowPopup }) => {
  const handleClose = () => {
    setShowPopup(!showPopup);
  };
  return (
    <div className="todo-section">
      <div className="data-section-container">
        <div className="data-section">
          <button className="button" onClick={handleClose}>close</button>
          <div className="inputDataContainer">
            <div className="inputData">
              <div className="inputDiv">
                <label htmlFor="">Todo Title</label>
                <input type="text" name="title" id="" />
              </div>
              <div className="inputDiv">
                <label htmlFor="">Description</label>
                <textarea name="message" rows="6" cols="50" placeholder="Write todo's description here">
                  
                </textarea>
              </div>
              <div className="inputDiv"><button>Add Todo</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoPopup;
