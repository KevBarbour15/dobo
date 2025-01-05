import "./modal.scss";

// animation imports
import useFadeIn from "../../animation-hooks/fadeIn";

// component imports
import { CircleX } from "lucide-react";

const Modal = ({ isVisible, title, children, onClose }) => {
  useFadeIn(isVisible, ".modal-content", 0.25);
  useFadeIn(isVisible, ".modal-overlay", 0.5);

  if (!isVisible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <p className="modal-title">{title}</p>
          <button onClick={onClose} className="close-button">
            <CircleX strokeWidth={0.75} size={24} />
          </button>
        </header>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
