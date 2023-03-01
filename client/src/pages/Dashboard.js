import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { Container } from '@mui/material';
import HeaderBar from '../components/HeaderBar';

function Dashboard() {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  });

  return (
    <Container>
      <HeaderBar />
      
      <h1>Dashboard</h1>
    </Container>
  );
}

export default Dashboard;