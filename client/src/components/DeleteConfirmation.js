import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function DeleteConfirmation({ open, handleConfirm, handleCancel }) {
  return (
    <Dialog open={open}>
      <DialogTitle>
        Confirm Delete
      </DialogTitle>
      
      <DialogContent>
        <DialogContentText>
          Are you sure you want to permanently delete this whiteboard?
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleConfirm}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmation;