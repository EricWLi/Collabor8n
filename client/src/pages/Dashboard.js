import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import useUserBoards from '../hooks/useUserBoards';
import { Button, Container, Grid } from '@mui/material';
import HeaderBar from '../components/HeaderBar';
import ThumbnailCard from '../components/ThumbnailCard';

function Dashboard() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { boards, createNewBoard, deleteBoard } = useUserBoards();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  });

  if (!user || boards.error) {
    return;
  }

  async function handleNewBoardClick() {
    const newBoard = await createNewBoard();

    if (newBoard) {
      navigate(`/boards/${newBoard._id}`);
    }
  }

  const boardCards = boards.map(board => {
    return (
      <Grid item xs={12} sm={6} lg={4} xl={3}>
        <ThumbnailCard boardId={board._id} onDelete={deleteBoard} />
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
          <Button variant="text" size="small" color="secondary" onClick={handleNewBoardClick}>New Board</Button>
        </Grid>
      </Grid>
      
      <Grid
        container
        spacing={3}
      >
        {boardCards}
      </Grid>
    </Container>
  );
}

export default Dashboard;