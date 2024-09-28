import axios from 'axios';

// Replace this URL with your backend API URL
const API_URL = 'http://localhost:8080/task';

export const addTask = async (task) => {
  return await axios.post(`${API_URL}/AddNewtask`, task);
};

export const fetchTasks = async () => {
  const response = await axios.get(`${API_URL}/GettAll`);
  return response.data;
};

export const updateTask = async (task) => {
  return await axios.put(`${API_URL}/`, task);
};

export const deleteTask = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
