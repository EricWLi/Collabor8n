import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Grid } from '@mui/material';
import useRequireAuth from '../hooks/useRequireAuth';
import useUserBoards from '../hooks/useUserBoards';
import HeaderBar from '../components/HeaderBar';
import ThumbnailCard from '../components/ThumbnailCard';
import DeleteConfirmation from '../components/DeleteConfirmation';

function Dashboard() {
  const user = useRequireAuth();
  const { boards, createNewBoard, deleteBoard } = useUserBoards();
  const [idToDelete, setIdToDelete] = useState(null);
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

  const shouldOpenDeleteDialog = idToDelete !== null;

  const boardCards = boards.map(board => {
    return (
      <Grid item xs={12} sm={6} lg={4} xl={3} key={board._id}>
        <ThumbnailCard boardId={board._id} onDelete={() => setIdToDelete(board._id)} />
      </Grid>
    )
  });

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