import React from "react";

function TodoItem({ todo, index, toggleTodo, deleteTodo }) {
  return (
    <li className={todo.completed ? "completed" : ""}>
      {todo.text}
      <div>
        <button onClick={() => toggleTodo(index)}>✓</button>
        <button onClick={() => deleteTodo(index)}>🗑</button>
      </div>
    </li>
  );
}

export default TodoItem;
