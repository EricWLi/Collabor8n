import { useState } from 'react';
import { Alert, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";

function ToastNotification({ notification }) {
  const [open, setOpen] = useState(true);

  if (!notification) {
    return;
  }

  // Handlers
  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  const severity = notification.error ? 'error' : 'success';
  const duration = notification.error ? null : 6000;
  const message = notification.error ? notification.error.message : 'You are connected!';
  const isUnauthorized = notification?.error?.status === 401;

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={duration}
    >
      <Alert severity={severity} variant="filled">
        {message} {isUnauthorized && <Link to="/login" className="router-link">Login</Link>}
      </Alert>
    </Snackbar>
  );
}

export default ToastNotification;