export const showSuccessNotification = (enqueueSnackbar, message) => {
  enqueueSnackbar(message, {
    autoHideDuration: 1500,
    style: {
      maxWidth:"250px",
      backgroundColor: "white",
      color: "#bd9c72",
      border: "2px solid #bd9c72",
      borderRadius: "5px",
      fontSize: "12px",
      fontFamily: "Poppins, sans-serif",
      textTransform: "uppercase",
      textAlign: "center",
      boxShadow: "1.25px 1.25px 2.5px black",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
