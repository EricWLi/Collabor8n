
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom'; 
import { ReactComponent as LogoHorizontal } from '../assets/logo-horizontal.svg';
import { useAuthContext } from '../contexts/AuthContext';

function HeaderBar() {
  const { user, signout } = useAuthContext();

  return (
    <>
      <Box
        component="nav"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '24px',
          height: '80px',
          left: '0px',
          right: '0px',
          top: '0px',
          marginTop: '8px'
        }}
      >
        <Box maxWidth='256px' component={Link} to="/">
          <LogoHorizontal style={{ width: '100%' }} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            flex: 'none',
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '8px'
          }}
        >
          {user ?
            (
              <Button
                variant="contained"
                color="error"
                sx={{ borderRadius: '24px' }}
                onClick={signout}
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
    </>
  );
}

export default HeaderBar;