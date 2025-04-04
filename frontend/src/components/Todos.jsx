import React from "react";
import Todo from "./Todo";

const Todos = ({ data }) => {
  return (
    <div style={
        {
            display:"flex",
            flexDirection:"column",
            gap:20
        }
    }>
      {data.map((todo, index) => (
        <Todo key={todo._id} todoId={todo._id} title={todo.title} />
      ))}
    </div>
  );
};

export default Todos;
