import { Box, Container, Button, TextField, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoAvatar from '../components/LogoAvatar';
import '../assets/style/LoginPage.css';

function LoginPage() {
    return (
        <Container>
          <Box className='login-content'>
            <LogoAvatar pageName='Login' />
            
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
                className="login-button"
                type="submit"
                fullWidth
                variant="contained"
              >
                Sign In
              </Button>

              <Box textAlign='center'>
                <Link to='/signup'>
                  Don't have an account? Sign Up
                </Link>
              </Box>

            </Box>
          </Box>
        </Container>
    );
}

export default LoginPage;