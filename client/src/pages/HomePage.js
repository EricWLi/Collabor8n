import { Container, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoHorizontal } from '../assets/logo-horizontal.svg';

function HomePage() {
    return (
        <Container>
            <Box
                className='navbar'
                component='nav'
            >
                <LogoHorizontal className="logo" />

                <Box className='navbar-buttons'>
                    <Button variant="contained" color='secondary' component={Link} to='/login'>Login</Button>
                    <Button variant="contained" color='primary' component={Link} to='/signup'>Get Started</Button>
                </Box>
            </Box>
        </Container>
    )
}

export default HomePage;