import { Container, Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { ReactComponent as LogoHorizontal } from '../assets/logo-horizontal.svg';
import { ReactComponent as HeroImage } from '../assets/hero-image.svg';

function HomePage() {
  const { signout, user } = useAuthContext();

  async function handleLogout() {
    await signout();
  }

  return (
    <Container>
      <Box
        component="nav"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 24px',
          gap: '64px',
          height: '80px',
          left: '0px',
          right: '0px',
          top: '0px'
        }}
      >
        <Link to="/">
          <LogoHorizontal style={{ minWidth: '230px', height: '51px' }} />
        </Link>

        <Box
          sx={{
            display: 'flex',
            flex: 'none',
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '16px'
          }}
        >
          { user ? 
          (
            <Button
              variant="contained"
              color="error"
              sx={{ borderRadius: '24px' }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : 
          (
            <>
              <Button
                variant="contained"
                color="secondary"
                sx={{ borderRadius: '24px' }}
                component={Link}
                to="/login"
              >
                Login
              </Button>

              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: '24px' }}
                component={Link}
                to="/signup"
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Box>

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