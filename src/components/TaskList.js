import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import ConfirmDelete from './ConfirmDelete';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:8080/task/GettAll');
    setTasks(response.data);
  };

  const handleSaveTask = async (task) => {
    if (currentTask) {
      await axios.put(`http://localhost:8080/task/`, task);
    } else {
      await axios.post('http://localhost:8080/task/AddNewtask', task);
    }
    fetchTasks();
    setFormOpen(false);
    setCurrentTask(null);
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setFormOpen(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/task/${id}`);
    fetchTasks();
    setDeleteConfirmOpen(false);
  };

  // Search functionality
  const filteredTasks = tasks.filter((task) =>
    task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-5 p-5 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Task Manager</h1>
      
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Assigned To..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between mb-4">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => {
            setCurrentTask(null);
            setFormOpen(true);
          }}
        >
          Add Task
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={fetchTasks} // Refresh function
        >
          Refresh
        </button>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Sr no</th>
            <th className="border px-4 py-2">Assigned To</th>
            <th className="border px-4 py-2">Due Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Priority</th>
            <th className="border px-4 py-2">Comment</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={(id) => {
                setTaskToDelete(id);
                setDeleteConfirmOpen(true);
              }}
              index={index + 1} // Serial number
            />
          ))}
        </tbody>
      </table>

      <TaskForm
        currentTask={currentTask}
        onSave={handleSaveTask}
        isOpen={isFormOpen}
        onClose={() => setFormOpen(false)}
      />
      <ConfirmDelete
        isOpen={isDeleteConfirmOpen}
        onConfirm={() => handleDelete(taskToDelete)}
        onCancel={() => setDeleteConfirmOpen(false)}
      />
    </div>
  );
};

export default TaskList;
