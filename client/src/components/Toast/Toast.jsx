import "./toast.scss";

const Toast = ({ closeToast, message }) => {
  const toastStyle = {
    position: "top-left",
    borderRadius: "0px",
    border: "1.5px solid black",
    color: "black",
    backgroundColor: "#efefef",
    boxShadow: "10px 10px 5px black",
    fontWeight: "500",
    width: "300px",
    height: "auto",
  };

  return (
    <div className="toastContainer">
      <p>{message}</p>
    </div>
  );
};

export default Toast;
