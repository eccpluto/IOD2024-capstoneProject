import { Box, Container, Grid } from "@mui/material";
import ResourceCard from "./ResourceCard";
import useUnpaywallData from "../hooks/useUnpaywallData";
import useMongoDb from "../hooks/useMongoDb";
import { useEffect, useState } from "react";

// display resources in a grid
export default function ResourceBrowser(props) {

  // destructure props, also indicates allowable props
  const { sourceTarget, resourceArray } = props;

  // const [initialRender, setInitialRender] = useState(true);

  // link with database
  // const [dbResult, setRequestConfig, doExecute] = useMongoDb();

  // useEffect(() => {
  //   if (initialRender) {
  //     // request associated library for user
  //     console.log('in ResourceBrowser use effect');
  //     setRequestConfig("get", `http://localhost:8080/api/libraries/${libraryOwner}`);
  //   }
  // }, [dbResult])

  // const handlePushToLibrary = () => {
  //   console.log(dbResult);
  // }

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
              <ResourceCard resource={resource} resourceType="article"
                // handlePushToLibrary={handlePushToLibrary}
              />
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}