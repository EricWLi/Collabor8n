import { useState } from 'react';
import { Alert, Snackbar } from "@mui/material";
import { Link } from "react-router-dom";

function ToastNotification({ board }) {
  const [open, setOpen] = useState(true);

  if (!board) {
    return;
  }

  // Handlers
  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  const severity = board.error ? 'error' : 'success';
  const duration = board.error ? null : 6000;
  const message = board.error ? board.message : 'You are connected!';
  const isUnauthorized = board.status === 401;

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      autoHideDuration={duration}
    >
      <Alert severity={severity} variant='filled'>
        { message } { isUnauthorized && <Link to='/login' className='router-link'>Login</Link>}
      </Alert>
    </Snackbar>
  );
}

export default ToastNotification;