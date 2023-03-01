import { useEffect } from 'react';
import { Box, Container, Button, TextField, Link, Typography } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import LogoAvatar from '../components/LogoAvatar';

function SignupPage() {
  const { signup, user, error, setError } = useAuthContext();
  const navigate = useNavigate();

  // If user is already logged in, redirect to dashboard.
  // Cleanup error message when unmounting component.
  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    }

    return () => {
      setError(null);
    }
  }, [user, navigate, setError]);

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = {
      firstName: data.get('first-name'),
      lastName: data.get('last-name'),
      username: data.get('username'),
      password: data.get('password'),
      confirmPassword: data.get('confirm-password')
    };

    await signup(user);
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
        <LogoAvatar pageName="Sign Up" />

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="first-name"
            label="First Name"
            name="first-name"
            autoComplete="given-name"
            autoFocus
            required
          />

          <TextField
            margin="normal"
            fullWidth
            id="last-name"
            label="Last Name"
            name="last-name"
            autoComplete="family-name"
            required
          />

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

          <TextField
            margin="normal"
            fullWidth
            id="confirm-password"
            label="Confirm Password"
            name="confirm-password"
            type="password"
            required
          />

          { error && <Typography color="error">{error}</Typography>}

          <Button
            sx={{
              marginTop: '24px',
              marginBottom: '24px'
            }}
            type="submit"
            fullWidth
            variant="contained"
          >
            Register
          </Button>

          <Box textAlign="center">
            <Link component={RouterLink} to="/login">
              Have an account? Sign In
            </Link>
          </Box>

        </Box>
      </Box>
    </Container>
  );
}

export default SignupPage;