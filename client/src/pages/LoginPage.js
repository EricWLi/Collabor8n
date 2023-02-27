import { Box, Container, Button, TextField, Link, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LogoAvatar from '../components/LogoAvatar';

function LoginPage() {
  const navigate = useNavigate();

  function handleGuestLogin() {
      fetch('/api/canvases', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        navigate(`/canvases/${data._id}`);
      })
      .catch(err => {
        alert('Failed to create new canvas. Please try again later.');
      });
  }
  

  return (
    <Container>
      <Box
        sx={{
          margin: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '500px'
        }}
      >
        <LogoAvatar pageName="Login" />

        <Box component="form" onSubmit={null} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            required
          />

          <TextField
            margin="normal"
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />

          <Button
            sx={{
              marginTop: '24px',
              marginBottom: '24px'
            }}
            type="submit"
            fullWidth
            variant="contained"
          >
            Sign In
          </Button>

          <Box textAlign="center">
            <Typography variant="body1">
              Don't have an account?
            </Typography>

            <Button component={RouterLink} to="/signup" variant="text">
              Sign Up
            </Button>

            <Typography variant="body2">or</Typography>

            <Button onClick={handleGuestLogin} variant="text" color="secondary">
              Continue as Guest
            </Button>
          </Box>

        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;