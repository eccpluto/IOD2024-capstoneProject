import { Box, Container, Grid } from "@mui/material";
import ResourceCard from "./ResourceCard";

// provides UI access to library resources for a give user
export default function LibraryBrowser(props) {

  // destructure props, also indicates allowable props
  const { userId } = props;

  return (
    <Container>
      {/* layout the resources in a grid */}
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="flex-end"
      >
        <Grid item xs={6} sm={4} lg={3} xl={2}>
          <ResourceCard />
        </Grid>
        <Grid item xs={6} sm={4} lg={3} xl={2}>
          <ResourceCard />
        </Grid>
        <Grid item xs={6} sm={4} lg={3} xl={2}>
          <ResourceCard />
        </Grid>
        <Grid item xs={6} sm={4} lg={3} xl={2}>
          <ResourceCard />
        </Grid>
      </Grid>
      {/* <Box
        height={200}
        width={200}
        my={4}
        display="flex"
        alignItems="center"
        gap={4}
        p={2}
        sx={{ border: '2px solid grey' }}
      >
        This Box uses MUI System props for quick customization.
      </Box> */}
    </Container>
  )
}