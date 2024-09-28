import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ConfirmDelete from './components/ConfirmDelete';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);

  // API integration - Fetch tasks from an API on initial load
  useEffect(() => {
    // Fetch tasks from API and update state (Example)
    // fetch('/api/tasks')
    //   .then(response => response.json())
    //   .then(data => setTasks(data));

    // For now, use placeholder tasks:
    const initialTasks = [
      { id: 1, title: 'Complete project report', assignedTo: 'User 1', dueDate: '2024-10-12', status: 'Completed', priority: 'High', comments: 'This task was critical for the project deadline.' },
      { id: 2, title: 'Design new homepage', assignedTo: 'User 2', dueDate: '2024-09-14', status: 'In Progress', priority: 'Low', comments: 'Mockups are under review, pending feedback.' },
      { id: 3, title: 'Update client data', assignedTo: 'User 3', dueDate: '2024-08-18', status: 'Not Started', priority: 'Normal', comments: 'Client data needs to be updated by the end of the week.' },
      { id: 4, title: 'Fix login bug', assignedTo: 'User 4', dueDate: '2024-06-12', status: 'In Progress', priority: 'Normal', comments: 'This bug affects login for admin users only.' }
    ];
    setTasks(initialTasks);
  }, []);

  // Filter tasks based on search query
  useEffect(() => {
    const filterTasks = tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTasks(filterTasks);
  }, [searchQuery, tasks]);

  const saveTasksToSession = (tasks) => sessionStorage.setItem('tasks', JSON.stringify(tasks));

  const handleAddOrUpdateTask = (task) => {
    if (currentTask) {
      const updatedTasks = tasks.map(t => (t.id === currentTask.id ? { ...t, ...task } : t));
      setTasks(updatedTasks);
      saveTasksToSession(updatedTasks);

      // API integration - Update task in API
      // fetch(`/api/tasks/${currentTask.id}`, {
      //   method: 'PUT',
      //   body: JSON.stringify(task),
      //   headers: { 'Content-Type': 'application/json' }
      // });

    } else {
      const newTask = { id: Date.now(), ...task };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveTasksToSession(updatedTasks);

      // API integration - Add new task to API
      // fetch('/api/tasks', {
      //   method: 'POST',
      //   body: JSON.stringify(newTask),
      //   headers: { 'Content-Type': 'application/json' }
      // });
    }
    setFormOpen(false);
    setCurrentTask(null);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setFormOpen(true);
  };

  const handleDeleteTask = (id) => {
    setTaskToDelete(id);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    const updatedTasks = tasks.filter(task => task.id !== taskToDelete);
    setTasks(updatedTasks);
    saveTasksToSession(updatedTasks);

    // API integration - Delete task from API
    // fetch(`/api/tasks/${taskToDelete}`, { method: 'DELETE' });

    setDeleteOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">To-Do List</h1>
          <div className="flex space-x-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setFormOpen(true)}>
              Add New Task
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setTasks([...tasks])}
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Task count */}
        <div className="text-right mb-4 text-sm text-gray-500">
          Total Tasks: {tasks.length}
        </div>

        {/* Search */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>

        <TaskForm
          currentTask={currentTask}
          onSave={handleAddOrUpdateTask}
          isOpen={isFormOpen}
          onClose={() => setFormOpen(false)}
        />
        <TaskList tasks={filteredTasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />
        <ConfirmDelete
          isOpen={isDeleteOpen}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteOpen(false)}
        />
      </div>
    </div>
  );
};

export default App;
