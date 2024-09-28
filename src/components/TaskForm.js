import React, { useState, useEffect } from 'react';

const TaskForm = ({ currentTask, onSave, isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Not Started');
  const [priority, setPriority] = useState('Normal');

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setAssignedTo(currentTask.assignedTo);
      setDueDate(currentTask.dueDate);
      setDescription(currentTask.description);
      setStatus(currentTask.status);
      setPriority(currentTask.priority);
    } else {
      setTitle('');
      setAssignedTo('');
      setDueDate('');
      setDescription('');
      setStatus('Not Started');
      setPriority('Normal');
    }
  }, [currentTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, assignedTo, dueDate, description, status, priority });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 opacity-75 absolute inset-0"></div>
      <div className="bg-white rounded p-8 shadow-lg z-10 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">{currentTask ? 'Edit Task' : 'New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded p-2 mb-4 w-full"
            required
          />
          <input
            type="text"
            placeholder="Assigned To"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="border border-gray-300 rounded p-2 mb-4 w-full"
            required
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border border-gray-300 rounded p-2 mb-4 w-full"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded p-2 mb-4 w-full"
            required
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded p-2 mb-4 w-full"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border border-gray-300 rounded p-2 mb-4 w-full"
          >
            <option value="Normal">Normal</option>
            <option value="High">High</option>
            <option value="Low">Low</option>
          </select>
          <div className="flex justify-end">
            <button type="button" className="bg-gray-300 text-black px-4 py-2 rounded mr-2" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
