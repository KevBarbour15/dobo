import "./modal.css";

const Modal = ({ isVisible, title, children, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <div className="invisible-element"></div>
          <p>{title}</p>
          <button onClick={onClose} className="close-button">
            <span className="material-icons">close</span>
          </button>
        </header>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
