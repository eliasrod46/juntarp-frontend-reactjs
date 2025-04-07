import { Alert, Snackbar } from "@mui/material";

export const AlertTable = ({
  severity,
  alertMessage,
  setOpen,
  showAlertFlag,
  duration = 3000,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      // key={"top" + "center"}
      open={showAlertFlag}
      autoHideDuration={duration}
      onClose={() => setOpen(false)} //close on duration
    >
      <Alert
        severity={severity}
        sx={{ width: "100%", py: 2, fontSize: "1.25rem" }}
        onClose={() => setOpen(false)} //close on click
      >
        {alertMessage}
      </Alert>
    </Snackbar>
  );
};
