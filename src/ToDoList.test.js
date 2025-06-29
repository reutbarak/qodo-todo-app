import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToDoList from './ToDoList';

describe('ToDoList', () => {
  test('renders header and input', () => {
    render(<ToDoList />);
    expect(screen.getByText(/to-do list/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  test('can add a new task and clears input', () => {
    render(<ToDoList />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    const button = screen.getByRole('button', { name: /add task/i });

    fireEvent.change(input, { target: { value: 'Buy milk' } });
    expect(input.value).toBe('Buy milk');
    fireEvent.click(button);
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    expect(input.value).toBe('');
  });

  test('does not add empty or whitespace-only tasks', () => {
    render(<ToDoList />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    const button = screen.getByRole('button', { name: /add task/i });
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  test('can mark a task as complete and incomplete', () => {
    render(<ToDoList />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    const button = screen.getByRole('button', { name: /add task/i });
    fireEvent.change(input, { target: { value: 'Read book' } });
    fireEvent.click(button);
    const checkbox = screen.getByRole('checkbox');
    const taskText = screen.getByText('Read book');
    // Initially not completed
    expect(checkbox.checked).toBe(false);
    expect(taskText).not.toHaveStyle('text-decoration: line-through');
    // Mark as complete
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    expect(taskText).toHaveStyle('text-decoration: line-through');
    // Mark as incomplete
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
    expect(taskText).not.toHaveStyle('text-decoration: line-through');
  });

  test('can delete a task', () => {
    render(<ToDoList />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    const button = screen.getByRole('button', { name: /add task/i });
    fireEvent.change(input, { target: { value: 'Task to delete' } });
    fireEvent.click(button);
    const deleteBtn = screen.getByRole('button', { name: /delete task task to delete/i });
    expect(screen.getByText('Task to delete')).toBeInTheDocument();
    fireEvent.click(deleteBtn);
    expect(screen.queryByText('Task to delete')).not.toBeInTheDocument();
  });

  test('can add multiple tasks and interact with them independently', () => {
    render(<ToDoList />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    const button = screen.getByRole('button', { name: /add task/i });
    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.click(button);
    fireEvent.change(input, { target: { value: 'Task 2' } });
    fireEvent.click(button);
    const checkboxes = screen.getAllByRole('checkbox');
    const task1 = screen.getByText('Task 1');
    const task2 = screen.getByText('Task 2');
    // Mark only Task 2 as complete
    fireEvent.click(checkboxes[1]);
    expect(task1).not.toHaveStyle('text-decoration: line-through');
    expect(task2).toHaveStyle('text-decoration: line-through');
    // Delete Task 1
    const deleteBtn1 = screen.getByRole('button', { name: /delete task task 1/i });
    fireEvent.click(deleteBtn1);
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});
