import "./modal.css";

// animation imports
import useFadeIn from "../../animation-hooks/fadeIn";

const Modal = ({ isVisible, title, children, onClose }) => {
  useFadeIn(isVisible, ".modal-content", 0.25);
  useFadeIn(isVisible, ".modal-overlay", 0.5);

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
