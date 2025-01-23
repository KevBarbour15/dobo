import "./modal.scss";



// component imports
import { X } from "lucide-react";

const Modal = ({ isVisible, title, children, onClose }) => {


  if (!isVisible) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <header className="modal-header">
          <p className="modal-title">{title}</p>
          <button onClick={onClose} className="close-button">
            <X strokeWidth={0.75} size={24} />
          </button>
        </header>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
