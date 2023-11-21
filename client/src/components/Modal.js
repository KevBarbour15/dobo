import React from 'react';
import "../styles/modal.css";

const Modal = ({ isVisible, title, children, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4>{title}</h4>
          <button onClick={onClose} className="close-button">X</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;