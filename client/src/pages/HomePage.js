import { Container, Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { ReactComponent as HeroImage } from '../assets/hero-image.svg';
import HeaderBar from '../components/HeaderBar';

function HomePage() {
  const { user } = useAuthContext();

  return (
    <Container>
      <HeaderBar />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <Box mt={4}>
          <Typography
            sx={{
              fontFamily: 'Roboto',
              fontSize: '72px',
              fontStyle: 'normal',
              fontWeight: 500,
              lineHeight: '96px',
              textAlign: 'center',
              maxWidth: '842px'
            }}
          >
            Sketch, draw, and brainstorm like never before
          </Typography>
        </Box>

        <Box mt={4}>
          <Button
            variant="contained"
            color={user ? 'secondary' : 'primary'}
            sx={{ borderRadius: '24px' }}
            component={Link}
            to={user ? '/dashboard' : '/signup'}
          >
            {user ? 'Go to Dashboard' : 'Get Started'}
          </Button>
        </Box>

        <Box mt={4} sx={{ width: '100%' }}>
          <HeroImage />
        </Box>
      </Box>
    </Container>
  )
}

export default HomePage;