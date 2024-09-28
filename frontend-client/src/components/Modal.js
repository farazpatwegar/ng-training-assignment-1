import React from 'react';
import './Modal.css'; // Import the CSS for styling the modal

const Modal = ({ isOpen, onClose, onConfirm, message }) => {
  // If the modal is not open, return null (render nothing)
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirmation</h2> {/* Modal title */}
        <p>{message}</p> {/* Message to display in the modal */}
        <div className="modal-actions">
          <button onClick={onConfirm}>Yes</button> {/* Confirm button */}
          <button onClick={onClose}>No</button> {/* Cancel button */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
