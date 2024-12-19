import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useMst } from "hooks/useMst";

function GlobalSnackbar() {
  const rootStore = useMst();
  const { snackbar } = rootStore;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    snackbar.hide();
  };

  return (
    <Snackbar
      open={snackbar.isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={snackbar.severity}
        sx={{ width: "100%" }}
        elevation={6}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}

export default observer(GlobalSnackbar);
