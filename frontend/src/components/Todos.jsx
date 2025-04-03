import React from "react";
import Todo from "./Todo";

const Todos = ({ data }) => {
  return (
    <div>
      {data.map((todo, index) => (
        <Todo key={index} title={todo.title} />
      ))}
    </div>
  );
};

export default Todos;
