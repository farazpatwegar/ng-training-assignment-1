import React from 'react';

const TaskItem = ({ task, onEdit, onDelete, index }) => {
  return (
    <tr className="hover:bg-gray-50 transition duration-200">
      <td className="border px-4 py-2">{index}</td> {/* Serial Number */}
      <td className="border px-4 py-2">{task.assignedTo}</td>
      <td className="border px-4 py-2">{task.date}</td>
      <td className="border px-4 py-2">{task.status}</td>
      <td className="border px-4 py-2">{task.priority}</td>
      <td className="border px-4 py-2">{task.comment}</td> {/* Updated to use 'comment' */}
      <td className="border px-4 py-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded mr-2"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TaskItem;
