import React, { useState } from 'react';
import './styles.css';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) {
      setTasks([...tasks, trimmed]);
      setInput('');
    }
  };

  return (
    <div className="todo-container">
      <h1 className="todo-header">To-Do List</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add a new task..."
          required
          className="todo-input"
        />
        <button type="submit" className="todo-button">Add Task</button>
      </form>
      <ul className="todo-ul">
        {tasks.map((task, idx) => (
          <li key={idx} className="todo-li">{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
