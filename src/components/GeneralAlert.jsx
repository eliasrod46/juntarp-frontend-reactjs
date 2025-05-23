import { Alert, Snackbar } from "@mui/material";

export const GeneralAlert = ({
  severity,
  alertMessage,
  setOpen,
  open,
  duration = 3000,
}) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      // key={"top" + "center"}
      open={open}
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
