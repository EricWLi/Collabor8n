import { Container, Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoHorizontal } from '../assets/logo-horizontal.svg';
import { ReactComponent as HeroImage } from '../assets/hero-image.svg';
import '../assets/style/HomePage.css'

function HomePage() {
  return (
    <Container>
      <Box
        className="navbar"
        component="nav"
      >
        <Link to="/">
          <LogoHorizontal className="logo" />
        </Link>

        <Box className="navbar-buttons">
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
        </Box>
      </Box>

      <Box
        className="hero"
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
            color="primary"
            sx={{ borderRadius: '24px' }}
            component={Link}
            to="/signup"
          >
            Get Started
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