import { Box, Container, Grid } from "@mui/material";
import ResourceCard from "./ResourceCard";
import useUnpaywallData from "../hooks/useUnpaywallData";
import useMongoDb from "../hooks/useMongoDb";
import { useEffect, useState } from "react";
import useGetLibrary from "../hooks/useGetLibrary";
import useAddResourceToLibrary from "../hooks/useAddResourceToLibrary";
import { useUserContext } from "../contexts/UserContext";

// display resources in a grid
export default function ResourceBrowser(props) {

  // destructure props, data array to display and a variant property
  const { resourceArray, browserVariant } = props;

  // make available the ability to add resources to a library, callback referenced in each card
  const { user } = useUserContext();
  // console.log(user);
  const [loading, library] = useGetLibrary(user.id);
  // console.log(library);
  const [processing, handleAddResourcesToLibrary] = useAddResourceToLibrary();

  const callbackAddResourcesToLibrary = (resource) => {
    // console.log(resource);
    handleAddResourcesToLibrary(resource, library._id);
  }

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
        {/* {console.log(resourceArray)} */}
        {resourceArray && resourceArray.map((resource, index) => {
          return (
            <Grid item key={index}>
              {/* {console.log(resource)} */}
              <ResourceCard resource={resource} resourceType="article" cardVariant={browserVariant}
                callbackAddResourcesToLibrary={callbackAddResourcesToLibrary} />
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}