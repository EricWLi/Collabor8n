import { Container, Box } from '@mui/material';
import LogoAvatar from "../components/LogoAvatar";

function SignupPage() {
  return (
    <Container>
      <Box className="signup-content">
        <LogoAvatar pageName="Sign Up" />
      </Box>
    </Container>
  );
}

export default SignupPage;