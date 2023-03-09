import { Autocomplete, Checkbox, Dialog, DialogContent, DialogTitle, FormControlLabel, TextField } from '@mui/material';
import { debounce } from '@mui/material/utils';
import { useEffect, useState } from 'react';

function ShareDialog({ open }) {
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`/api/users/search?query=${query}`);
      const users = await res.json();
      const uniqueUsernames = new Set(selected.map(user => user.username));
      const nextOptions = selected.concat(users.filter(user => !uniqueUsernames.has(user.username)));

      setOptions(nextOptions);
    };

    fetchUsers();
  }, [query]);

  return (
    <Dialog open={open}>
      <DialogTitle>Share Whiteboard</DialogTitle>

      <DialogContent>
        <Autocomplete
          label="Search for User"
          options={options}
          getOptionLabel={option => option.username}
          renderInput={params => <TextField {...params} />}
          onChange={(event, val) => setSelected(val)}
          onInputChange={(event, val) => setQuery(val)}
          filterOptions={x => x}
          filterSelectedOptions
          multiple
          fullWidth
        />

        <FormControlLabel control={<Checkbox />} label="Allow Guests" />
      </DialogContent>
    </Dialog>
  )
}

export default ShareDialog;