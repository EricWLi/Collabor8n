import { Box, SvgIcon, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/logoIcon.svg';

function LogoAvatar() {
    return (
        <>
            <Link to='/'>
              <SvgIcon className='logoIcon' component={Logo} inheritViewBox />
            </Link>

            <Typography component="h1" variant="h4">
                Collabor8n
            </Typography>
        </>
    )
}

export default LogoAvatar;