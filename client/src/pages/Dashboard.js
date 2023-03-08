import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import useRequireAuth from '../hooks/useRequireAuth';
import useUserBoards from '../hooks/useUserBoards';
import HeaderBar from '../components/HeaderBar';
import ThumbnailCard from '../components/ThumbnailCard';
import DeleteConfirmation from '../components/DeleteConfirmation';

function Dashboard() {
  const user = useRequireAuth();
  const { boards, createNewBoard, deleteBoard } = useUserBoards();
  const [idToDelete, setIdToDelete] = useState(null);
  const [filter, setFilter] = useState('all');
  const [orderBy, setOrderBy] = useState('lastUpdated');
  const navigate = useNavigate();

  if (!user || boards.error) {
    return;
  }

  async function handleNewBoardClick() {
    const newBoard = await createNewBoard();

    if (newBoard) {
      navigate(`/boards/${newBoard._id}`);
    }
  }

  async function handleDeleteConfirm() {
    await deleteBoard(idToDelete);
    setIdToDelete(null);
  }

  function handleDeleteCancel() {
    setIdToDelete(null);
  }

  const filteredBoards = boards
    .filter(board => {
      switch (filter) {
        case 'owner':
          return board.owner._id === user.userId;
        case 'shared':
          return board.collaborators.includes(user.userId)
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (orderBy) {
        case 'lastCreated':
          return a.createdAt > b.createdAt ? -1 : 1;
        case 'lastUpdated':
          return a.updatedAt > b.updatedAt ? -1 : 1;
        case 'firstCreated':
          return a.createdAt < b.createdAt ? -1 : 1;
        case 'firstUpdated':
          return a.updatedAt < b.updatedAt ? -1 : 1;
        default:
          return 0;
      }
    });

  const boardCards = filteredBoards.map(board => {
    return (
      <Grid item xs={12} sm={6} lg={4} xl={3} key={board._id}>
        <ThumbnailCard board={board} onDelete={id => setIdToDelete(id)} />
      </Grid>
    )
  });

  const shouldOpenDeleteDialog = idToDelete !== null;

  return (
    <Container>
      <HeaderBar />

      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item>
          <h1>Dashboard</h1>
        </Grid>

        <Grid item>
          <Button
            variant="text"
            size="small"
            color="secondary"
            onClick={handleNewBoardClick}
          >
            New Board
          </Button>
        </Grid>
      </Grid>

      <Box className="filter">
        <FormControl sx={{ m: 1, minWidth: 180 }}>
          <InputLabel id="filter-label">Filter</InputLabel>
          <Select
            labelId="filter-label"
            id="filter-select"
            defaultValue="all"
            onChange={e => setFilter(e.target.value)}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="owner">My Boards</MenuItem>
            <MenuItem value="shared">Shared with me</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ m: 1, minWidth: 180 }}>
          <InputLabel id="orderby-label">Order By</InputLabel>
          <Select
            labelId="orderby-label"
            id="orderby-select"
            defaultValue="lastUpdated"
            onChange={e => setOrderBy(e.target.value)}
          >
            <MenuItem value="lastCreated">Last Created</MenuItem>
            <MenuItem value="lastUpdated">Last Updated</MenuItem>
            <MenuItem value="firstCreated">First Created</MenuItem>
            <MenuItem value="firstUpdated">First Updated</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid
        container
        spacing={3}
      >
        {boardCards}
      </Grid>

      <DeleteConfirmation
        open={shouldOpenDeleteDialog}
        handleConfirm={handleDeleteConfirm}
        handleCancel={handleDeleteCancel}
      />
    </Container>
  );
}

export default Dashboard;