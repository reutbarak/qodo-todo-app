import React, { useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import AddTaskForm from './AddTaskForm';
import Task from './Task';
import './styles.css';

function ToDoList() {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (text) => {
    const newTask = { id: `task-${Date.now()}`, text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const handleToggleComplete = (index) => {
    setTasks(currentTasks =>
      currentTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (index) => {
    setTasks(currentTasks => currentTasks.filter((_, i) => i !== index));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, removed);

    setTasks(reorderedTasks);
  };

  return (
    <div className="todo-container">
      <h1 className="todo-header">To-Do List</h1>
      <AddTaskForm onAddTask={handleAddTask} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul className="todo-ul" {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  onToggleComplete={handleToggleComplete}
                  onDeleteTask={handleDeleteTask}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default ToDoList;
