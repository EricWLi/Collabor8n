import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logo-vertical.svg';

function LogoAvatar({ pageName }) {
    return (
        <>
            <Box
                m={2}
                textAlign='center'
            >
                <Link to='/'>
                    <Logo height='128px' />
                </Link>
            </Box>

            { pageName &&
                <Typography component="h1" variant="h4">
                    { pageName }
                </Typography>
            }
        </>
    )
}

export default LogoAvatar;