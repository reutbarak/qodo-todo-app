import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

function Task({ task, index, onToggleComplete, onDeleteTask }) {
  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <li
          className={`todo-li ${snapshot.isDragging ? 'dragging' : ''}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(index)}
            className="todo-checkbox"
          />
          <span className={`task-text ${task.completed ? 'completed' : ''}`}>
            {task.text}
          </span>
          <button
            onClick={() => onDeleteTask(index)}
            className="todo-delete"
            aria-label={`Delete task ${task.text}`}
          >
            Delete
          </button>
        </li>
      )}
    </Draggable>
  );
}

export default Task;
