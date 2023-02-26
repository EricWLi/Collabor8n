import { Box, Container, Button, TextField, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LogoAvatar from '../components/LogoAvatar';

function LoginPage() {
  return (
    <Container>
      <Box
        sx={{
          margin: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
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
            <Link component={RouterLink} to="/signup">
              Don't have an account? Sign Up
            </Link>
          </Box>

        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;