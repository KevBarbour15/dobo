export const showSuccessNotification = (enqueueSnackbar, message) => {
  enqueueSnackbar(message, {
    autoHideDuration: 1250,
    style: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      color: "#bd9c72",
      border: "2px solid #bd9c72",
      borderRadius: "5px",
      fontSize: "20px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: "bold",
      textTransform: "lowercase",
      textAlign: "center",
      boxShadow: "1.25px 1.25px 2.5px black",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
