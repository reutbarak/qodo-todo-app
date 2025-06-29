import React, { useState } from 'react';
import './styles.css';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) {
      setTasks([...tasks, { text: trimmed, completed: false }]);
      setInput('');
    }
  };

  const toggleComplete = (idx) => {
    setTasks(tasks =>
      tasks.map((task, i) =>
        i === idx ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (idx) => {
    setTasks(tasks => tasks.filter((_, i) => i !== idx));
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
          <li key={idx} className="todo-li">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(idx)}
              className="todo-checkbox"
            />
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none', marginLeft: 8 }}
            >
              {task.text}
            </span>
            <button
              onClick={() => deleteTask(idx)}
              className="todo-delete"
              style={{ marginLeft: 12 }}
              aria-label={`Delete task ${task.text}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
