import "./toast.scss";

const Toast = ({ closeToast, message }) => {

  return (
    <div className="toastContainer">
      <p>{message}</p>
    </div>
  );
};

export default Toast;
