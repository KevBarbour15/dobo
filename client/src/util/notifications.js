export const showSuccessNotification = (enqueueSnackbar, message) => {
  enqueueSnackbar(message, {
    autoHideDuration: 1500,
    style: {
      backgroundColor: "#efefef",
      color: "black",
      border: "1px solid black",
      borderRadius: "25px",
      fontSize: "15px",
      fontFamily: "Figtree",
      textAlign: "center",
      boxShadow: "1.25px 1.25px 2.5px black",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  });
};
