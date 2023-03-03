import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import useUserBoards from '../hooks/useUserBoards';
import { Button, Card, CardMedia, Container, Grid } from '@mui/material';
import HeaderBar from '../components/HeaderBar';

function Dashboard() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { boards, createNewBoard } = useUserBoards();

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
        <Link to={`/boards/${board._id}`}>
          <Card
            key={board._id} sx={{
              minWidth: '200px',
              maxWidth: '384px',
              height: '216px',
              backgroundColor: 'white'
            }}
          >
            <CardMedia image={`/images/thumbnail/${board._id}`} sx={{ width: '100%', height: '100%' }} />
          </Card>
        </Link>
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