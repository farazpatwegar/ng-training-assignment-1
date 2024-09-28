import React, { useState, useEffect } from 'react';
import { addTask } from '../services/taskService';

const TaskForm = ({ currentTask, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    assignedTo: '',
    dueDate: '',
    comment: '',
    status: 'Not Started',
    priority: 'Normal',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState({ error: '', success: '' });

  useEffect(() => {
    if (currentTask) {
      setFormData({
        assignedTo: currentTask.assignedTo,
        dueDate: currentTask.date,
        comment: currentTask.comment,
        status: currentTask.status,
        priority: currentTask.priority,
      });
    } else {
      resetForm();
    }
  }, [currentTask]);

  const resetForm = () => {
    setFormData({
      assignedTo: '',
      dueDate: '',
      comment: '',
      status: 'Not Started',
      priority: 'Normal',
    });
    setFeedback({ error: '', success: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.dueDate < new Date().toISOString().split("T")[0]) {
      setFeedback({ error: 'Due date cannot be in the past.', success: '' });
      return;
    }

    setIsLoading(true);
    setFeedback({ error: '', success: '' });

    try {
      await addTask({ ...formData, id: 0 });
      setFeedback({ success: 'Task saved successfully!', error: '' });
      resetForm();
      onSave();
    } catch (err) {
      setFeedback({ error: 'Failed to save the task. Please try again.', success: '' });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 opacity-75 absolute inset-0"></div>
      <div className="bg-white rounded-lg p-8 shadow-lg z-10 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">{currentTask ? 'Edit Task' : 'New Task'}</h2>
        {feedback.error && <p className="text-red-500 mb-4">{feedback.error}</p>}
        {feedback.success && <p className="text-green-500 mb-4">{feedback.success}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="assignedTo"
            placeholder="Assigned To"
            value={formData.assignedTo}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 mb-4 w-full"
            required
          />
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 mb-4 w-full"
            required
          />
          <textarea
            name="comment"
            placeholder="Comment"
            value={formData.comment}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 mb-4 w-full"
            required
          />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 mb-4 w-full"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 mb-4 w-full"
          >
            <option value="Normal">Normal</option>
            <option value="High">High</option>
            <option value="Low">Low</option>
          </select>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
