import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToDoList from './ToDoList';

// Mock the drag-and-drop functionality since we are not testing the library itself
jest.mock('@hello-pangea/dnd', () => ({
  DragDropContext: ({ children }) => <div>{children}</div>,
  Droppable: ({ children }) => <div>{children( { innerRef: jest.fn(), droppableProps: {}, placeholder: null } )}</div>,
  Draggable: ({ children }) => <div>{children( { innerRef: jest.fn(), draggableProps: {}, dragHandleProps: {} }, {} )}</div>,
}));

describe('ToDoList Integration Tests', () => {

  // Test 1: Initial Render
  test('should render the header and the add task form', () => {
    render(<ToDoList />);
    expect(screen.getByText(/To-Do List/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Add a new task/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Task/i })).toBeInTheDocument();
  });

  // Test 2: Add a Task
  test('should allow a user to add a task to the list', () => {
    render(<ToDoList />);
    const input = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByRole('button', { name: /Add Task/i });

    fireEvent.change(input, { target: { value: 'Learn testing' } });
    fireEvent.click(addButton);

    expect(screen.getByText(/Learn testing/i)).toBeInTheDocument();
    expect(input.value).toBe(''); // Input should be cleared
  });

  // Test 3: Complete a Task
  test('should allow a user to mark a task as complete', () => {
    render(<ToDoList />);
    fireEvent.change(screen.getByPlaceholderText(/Add a new task/i), { target: { value: 'Buy groceries' } });
    fireEvent.click(screen.getByRole('button', { name: /Add Task/i }));

    const taskText = screen.getByText(/Buy groceries/i);
    const checkbox = screen.getByRole('checkbox');

    expect(taskText).not.toHaveClass('completed');
    fireEvent.click(checkbox);
    expect(taskText).toHaveClass('completed');
  });

  // Test 4: Delete a Task
  test('should allow a user to delete a task', () => {
    render(<ToDoList />);
    fireEvent.change(screen.getByPlaceholderText(/Add a new task/i), { target: { value: 'A task to be deleted' } });
    fireEvent.click(screen.getByRole('button', { name: /Add Task/i }));

    const taskText = screen.getByText(/A task to be deleted/i);
    expect(taskText).toBeInTheDocument();

    const deleteButton = screen.getByRole('button', { name: /Delete task/i });
    fireEvent.click(deleteButton);

    expect(taskText).not.toBeInTheDocument();
  });

  // Test 5: Add multiple tasks and interact
  test('should handle multiple tasks correctly', () => {
    render(<ToDoList />);
    const input = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByRole('button', { name: /Add Task/i });

    // Add two tasks
    fireEvent.change(input, { target: { value: 'First task' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'Second task' } });
    fireEvent.click(addButton);

    const firstTask = screen.getByText(/First task/i);
    const secondTask = screen.getByText(/Second task/i);
    const checkboxes = screen.getAllByRole('checkbox');

    // Complete the second task
    fireEvent.click(checkboxes[1]);
    expect(firstTask).not.toHaveClass('completed');
    expect(secondTask).toHaveClass('completed');

    // Delete the first task
    const deleteButtons = screen.getAllByRole('button', { name: /Delete task/i });
    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText(/First task/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Second task/i)).toBeInTheDocument();
  });

  // Test 6: Prevent adding empty tasks
  test('should not add a task if the input is empty', () => {
    render(<ToDoList />);
    const addButton = screen.getByRole('button', { name: /Add Task/i });
    const tasks = screen.queryAllByRole('listitem');

    fireEvent.click(addButton);

    // Ensure no new task is added
    expect(screen.queryAllByRole('listitem').length).toBe(tasks.length);
  });
});
