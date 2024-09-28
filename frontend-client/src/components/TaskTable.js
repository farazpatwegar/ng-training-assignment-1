import React from 'react';
import './TaskTable.css'; // Import styles for the TaskTable

const TaskTable = ({ tasks, onDelete, onEdit }) => {
  return (
    <div className="task-table">
      <h2>All Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td>{task.assignedTo}</td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.comments}</td>
              <td>
                <button className="btn-edit" onClick={() => onEdit(task)}>Edit</button>
                <button className="btn-delete" onClick={() => onDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
