import React from 'react';

const TaskItem = ({ task, onEdit, onDelete }) => {
  return (
    <tr>
      <td className="border px-4 py-2">{task.title}</td>
      <td className="border px-4 py-2">{task.assignedTo}</td>
      <td className="border px-4 py-2">{task.dueDate}</td>
      <td className="border px-4 py-2">{task.status}</td>
      <td className="border px-4 py-2">{task.priority}</td>
      <td className="border px-4 py-2">{task.comments}</td>
      <td className="border px-4 py-2">
        <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TaskItem;
