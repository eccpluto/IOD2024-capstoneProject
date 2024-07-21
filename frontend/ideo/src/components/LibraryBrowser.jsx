import { Box, Container, Grid } from "@mui/material";
import ResourceCard from "./ResourceCard";
import useUnpaywallData from "../hooks/useUnpaywallData";

// provides UI access to library resources for a give user
export default function LibraryBrowser(props) {

  // destructure props, also indicates allowable props
  const { userId } = props;

  // temporary code to pull down some data from unpaywall
  const [unpaywallData, getUnpaywallData] = useUnpaywallData();

  console.log(unpaywallData);

  return (
    <Container>
      {/* layout the resources in a grid */}
      <button onClick={() =>
        getUnpaywallData("gravity")}>
        Fetch
      </button>
      <Grid
        container
        spacing={3}
        direction="row"
        justifyContent="center"
        alignItems="flex-end"
      >
        {/* if we have data, we map these to cards */}
        {unpaywallData && unpaywallData.map((resource, index) => {
          return (
            <Grid item xs={6} sm={4} lg={3} xl={2} key={index}>
              <ResourceCard resource={resource} resourceType="article"  />
            </Grid>
          )
        })}
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