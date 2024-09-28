import React, { useState, useEffect } from 'react';
import Modal from './Modal'; // Import Modal component

const TaskForm = ({ task, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    assignedTo: '',
    status: 'Not Started',
    dueDate: '',
    priority: 'Normal',
    comments: '',
  });

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalOpen(true); // Open modal on form submit
  };

  const handleConfirmSave = () => {
    onSave(formData);
    setModalOpen(false);
    setFormData({
      assignedTo: '',
      status: 'Not Started',
      dueDate: '',
      priority: 'Normal',
      comments: '',
    });
  };

  return (
    <div className="task-form">
      <h2>{task ? 'Edit Task' : 'Add New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Assigned To:
          <input
            type="text"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Status:
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Priority:
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Normal">Normal</option>
            <option value="High">High</option>
          </select>
        </label>
        <label>
          Comments:
          <textarea
            name="comments"
            value={formData.comments}
            onChange={handleChange}
          />
        </label>
        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>

      {/* Modal for confirming save action */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmSave}
        message="Are you sure you want to save this task?"
      />
    </div>
  );
};

export default TaskForm;
