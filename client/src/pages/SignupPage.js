import { Box, Container, Button, TextField, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LogoAvatar from '../components/LogoAvatar';

function SignupPage() {
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

        <Box component="form" onSubmit={null} noValidate sx={{ mt: 1 }}>
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