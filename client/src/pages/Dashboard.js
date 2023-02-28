import { useAuthContext } from '../contexts/AuthContext';
import { Container } from '@mui/material';
import { Navigate } from 'react-router-dom';

function Dashboard() {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to={'/login'} />
  }

  return (
    <Container>
      <h1>Dashboard</h1>
    </Container>
  );
}

export default Dashboard;