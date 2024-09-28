import React from 'react';

const ConfirmDelete = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800 opacity-75 absolute inset-0"></div>
      <div className="bg-white rounded p-6 shadow-lg z-10">
        <p className="mb-4">Are you sure you want to delete this task?</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 px-4 py-2 rounded mr-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
