import { Box, Container, Grid } from "@mui/material";
import ResourceCard from "./ResourceCard";
import useUnpaywallData from "../hooks/useUnpaywallData";

// display resources in a grid
export default function ResourceBrowser(props) {

  // destructure props, also indicates allowable props
  const { userId, sourceTarget, resourceArray } = props;

  return (
    <Container>
      {/* layout the resources in a grid */}
      <Grid
        container
        padding={2}
        spacing={4}
        direction="row"
        justifyContent="center"
        alignItems="flex-end"
      >
        {/* if we have data, we map these to cards */}
        {resourceArray && resourceArray.map((resource, index) => {
          return (
            <Grid item key={index}>
              <ResourceCard resource={resource} resourceType="article" userId={userId} />
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}