import { Container, Grid, CircularProgress } from "@mui/material";

function LoadingScreen() {
  return (
    <Container sx={{ height: '100vh' }}>
      <Grid
        height="100%"
        alignItems="center"
        justifyContent="center"
        direction="column"
        container
      >
        <Grid
          display="flex"
          alignItems="center"
          justifyContent="center"
          item
        >
          <CircularProgress />
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoadingScreen;