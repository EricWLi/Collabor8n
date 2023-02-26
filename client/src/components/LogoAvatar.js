import { Box, Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logo-vertical.svg';

function LogoAvatar({ pageName }) {
  let header;

  if (pageName) {
    header = (
      <Typography component="h1" variant="h5" mt={3}>
        {pageName}
      </Typography>
    );
  }

  return (
    <>
      <Box
        m={2}
        textAlign="center"
      >
        <Link to="/">
          <Logo height="128px" />
        </Link>
      </Box>

      <Divider flexItem />

      {header}
    </>
  )
}

export default LogoAvatar;