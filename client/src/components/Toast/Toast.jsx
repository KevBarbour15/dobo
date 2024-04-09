import "./toast.css";

const Toast = ({ closeToast, message }) => (
  <div className="toastContainer">
    <p>{message}</p>
  </div>
);

export default Toast;
