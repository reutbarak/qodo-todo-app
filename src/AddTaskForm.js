import React, { useState } from 'react';

function AddTaskForm({ onAddTask }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) {
      onAddTask(trimmed);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task..."
        required
        className="todo-input"
      />
      <button type="submit" className="todo-button">Add Task</button>
    </form>
  );
}

export default AddTaskForm;
