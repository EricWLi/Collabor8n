import { Box, Container, Button, TextField, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import LogoAvatar from '../components/LogoAvatar';
import useRedirectIfLoggedIn from '../hooks/useRedirectIfLoggedIn';

function LoginPage() {
  useRedirectIfLoggedIn();
  const { loginAsGuest, login, error } = useAuthContext();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await login(data.get('username'), data.get('password'));
  }

  async function handleGuestLogin() {
    const redirectUrl = await loginAsGuest();
    navigate(redirectUrl);
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

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
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

          {error && <Typography color="error">{error}</Typography>}

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