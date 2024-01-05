export const showSuccessNotification = (enqueueSnackbar, message) => {
  enqueueSnackbar(message, {
    autoHideDuration: 1500,
    style: {
      backgroundColor: "black",
      color: "white",
      border: "2px solid #bd9c72",
      borderRadius: "25px",
      height: "80px",
      width: "300px",
      fontSize: "20px",
      fontFamily: "Aboreto, sans-serif",
      fontWeight: "600",
      textAlign: "center",
      boxShadow: "1px 1px 2px #000000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
