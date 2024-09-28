import axios from 'axios';

// Base URL for API (replace with your real API)
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Get all tasks
export const getTasks = async () => {
  return await axios.get(API_URL);
};

// Create a new task
export const createTask = async (task) => {
  return await axios.post(API_URL, task);
};

// Update a task
export const updateTask = async (id, updatedTask) => {
  return await axios.put(`${API_URL}/${id}`, updatedTask);
};

// Delete a task
export const deleteTask = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
