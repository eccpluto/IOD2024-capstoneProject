import { Box, CircularProgress, Container, Grid } from "@mui/material";
import ResourceCard from "./ResourceCard";
import useUnpaywallData from "../hooks/useUnpaywallData";
import useMongoDb from "../hooks/useMongoDb";
import { useEffect, useState } from "react";
import useGetLibrary from "../hooks/useGetLibrary";
import useAddResourceToLibrary from "../hooks/useAddResourceToLibrary";
import { useUserContext } from "../contexts/UserContext";
import { useLibraryContext } from "../contexts/LibraryContext";
import useRemoveResourceFromLibrary from "../hooks/useRemoveResourceFromLibrary";

// display resources in a grid
export default function ResourceBrowser(props) {

  // destructure props, data array to display and a variant property
  const { resourceArray, resourceLocation, loading } = props;

  // make available the ability to add resources to a library, callback referenced in each card
  // const { user } = useUserContext();
  // console.log(user);
  // const [errorLibrary, loadinglLibrary, library] = useGetLibrary(user._id);

  const { library, handleUpdateLibrary } = useLibraryContext();

  // console.log(library);
  const [errorAddToLibrary, loadingAddToLibrary, updatedAddToLibrary, handleAddResourceToLibrary] = useAddResourceToLibrary();
  const [errorRemoveFromLibrary, loadingRemoveFromLibrary, updatedRemoveFromLibrary, handleRemoveResourceFromLibrary] = useRemoveResourceFromLibrary();


  // used by resourcelocation online variant
  const callbackAddResourceToLibrary = (resource) => {
    // console.log(resource);
    handleAddResourceToLibrary(resource, library._id);
  };

  // user by resourcelocation local variant
  const callbackRemoveResourceFromLibrary = (resourceId) => {
    console.log(resourceId)
    handleRemoveResourceFromLibrary(resourceId, library._id);
  }

  // observe errors
  useEffect(() => {
    if (errorAddToLibrary) {
      alert(errorAddToLibrary);
    }
  }, [errorAddToLibrary])

  useEffect(() => {
    if (errorRemoveFromLibrary) {
      alert(errorRemoveFromLibrary);
    }
  }, [errorRemoveFromLibrary])

  // observe resource changes
  useEffect(() => {
    if (updatedAddToLibrary && updatedAddToLibrary._id) {
      console.log("Resource added, updating libraryContext")
      console.log(updatedAddToLibrary);
      handleUpdateLibrary(updatedAddToLibrary);
    }
  }, [updatedAddToLibrary])

  useEffect(() => {
    if (updatedRemoveFromLibrary && updatedRemoveFromLibrary._id) {
      console.log("Resource removed, updating libraryContext")
      console.log(updatedRemoveFromLibrary);
      handleUpdateLibrary(updatedRemoveFromLibrary);
    }
  }, [updatedRemoveFromLibrary])

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
        {loading && (
          <Box padding={4}>
            <CircularProgress />
          </Box>)}
        {/* {console.log(resourceArray)} */}
        {!loading && resourceArray && resourceArray.map((resource, index) => {
          return (
            <Grid item key={index}>
              {/* {console.log(resource)} */}
              <ResourceCard resource={resource} resourceType="article" resourceLocation={resourceLocation}
                callbackAddResourceToLibrary={callbackAddResourceToLibrary}
                callbackRemoveResourceFromLibrary={callbackRemoveResourceFromLibrary}
              />
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}