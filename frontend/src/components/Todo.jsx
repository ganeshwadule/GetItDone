import React, { useState } from "react";

const Todo = ({ title, todoId ,isChecked}) => {
  const [checked, setChecked] = useState(false);
  console.log(checked)
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
      <input
        type="checkbox"
        name={todoId}
        id={todoId}
        checked={isChecked}
      />
    </div>
  );
};

export default Todo;
