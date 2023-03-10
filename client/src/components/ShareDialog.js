import { Alert, Autocomplete, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, TextField } from '@mui/material';
import { debounce } from '@mui/material/utils';
import { useEffect, useState } from 'react';
import { XLg } from 'react-bootstrap-icons';
import { useAuthContext } from '../contexts/AuthContext';

function ShareDialog({ open, board, onClose }) {
  const { user } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState(null);
  const [collaborators, setCollaborators] = useState(board?.collaborators || []);
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState('');
  const [allowGuests, setAllowGuests] = useState(board?.allowGuests || false);
  const [defaultState, setDefaultState] = useState({
    collaborators: board?.collaborators || [],
    allowGuests: board?.allowGuests || false
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`/api/users/search?query=${query}`);
      const users = await res.json();
      const uniqueUsernames = new Set(collaborators.map(user => user.username));
      const nextOptions = collaborators.concat(users.filter(user => !uniqueUsernames.has(user.username)));

      setOptions(nextOptions);
    };

    if (query.length > 0) {
      fetchUsers();
    }
  }, [collaborators, query]);

  const handleSave = async () => {
    const update = {
      collaborators: collaborators,
      allowGuests: allowGuests
    };
    
    try {
      const res = await fetch(`/api/canvases/${board._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
      });
  
      const data = await res.json();
  
      if (res.ok) {
        setDefaultState(update);
        onClose();
      } else if (data.error) {
        setErrorMessage(data.error.message);
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <Dialog open={open} fullWidth>
      <Box position="absolute" right={0} top={0}>
        <IconButton onClick={onClose}>
          <XLg />
        </IconButton>
      </Box>

      <DialogTitle>Share Whiteboard</DialogTitle>

      <DialogContent>
        <Autocomplete
          label="Search for users"
          options={options}
          getOptionLabel={option => option.username}
          renderInput={params => <TextField {...params} label="Search for users" />}
          defaultValue={defaultState.collaborators}
          onChange={(event, val) => setCollaborators(val)}
          onInputChange={(event, val) => setQuery(val)}
          filterOptions={x => x}
          filterSelectedOptions
          multiple
        />

        <FormControlLabel
          control={
            <Checkbox defaultChecked={defaultState.allowGuests} onChange={event => setAllowGuests(event.target.checked)} />
          }
          label="Allow Guests"
        />

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ShareDialog;