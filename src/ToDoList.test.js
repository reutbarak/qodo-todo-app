import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToDoList from './ToDoList';

// Mock React useState since ToDoList uses it directly
import * as ReactModule from 'react';

// No need to mock useState if ToDoList imports from 'react' (not destructured)
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

    // Type a new task
    fireEvent.change(input, { target: { value: 'Buy milk' } });
    expect(input.value).toBe('Buy milk');

    // Submit the form
    fireEvent.click(button);

    // Task should appear in the list
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
    // Input should be cleared
    expect(input.value).toBe('');
  });

  test('does not add empty or whitespace-only tasks', () => {
    render(<ToDoList />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    const button = screen.getByRole('button', { name: /add task/i });

    // Try to add whitespace
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);
    // List should still be empty
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
