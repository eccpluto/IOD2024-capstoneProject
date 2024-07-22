import { Accordion, AccordionDetails, AccordionSummary, Box, Container, IconButton, Paper, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from "react";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// display a resource
// this could be from a search result(s), or from locally saved resources
export default function ResourceCard(props) {

    const [expanded, setExpanded] = useState(false);

    const resource = props.resource;
    const resourceType = props.resourceType;
    // userId allows us to present an option to save the resource on each card
    // const userId = props.userId;

    // unpayway provides some html-formatted strings
    const stripHTMLTags = (html) => {
        let temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || "";
    }

    const handleOpenLink = () => {
        // open the associated DOI link of the article in new tab
    }

    const handleOpenFile = () => {
        // pull the associated file using the file link and display in pdfjs viewer
    }

    // console.log(resource);

    return (
        <Paper
            elevation={5}
        // sx={onclick=alert("hello there")}
        >
            <Box
                padding={1}
                overflow={"visible"}
                height={150}
                width={200}
            >
                <Box
                    display={"flex"}
                >
                    <Box
                        height={100}
                        width={170}
                        overflow={"hidden"}
                    >
                        <Typography variant="subtitle2"
                            align="left" padding={1} sx={{ overflow: "hidden" }}
                        >
                            {/* {resourceType} */}
                            {resource.title}
                        </Typography>
                    </Box>

                    <Box
                        height={100}
                        overflow={"hidden"}
                    >
                        <IconButton
                            href={resource.url} target="_blank">
                            <OpenInNewIcon />
                        </IconButton>
                        <IconButton onClick={handleOpenFile}>
                            <FileOpenIcon />
                        </IconButton>

                    </Box>

                </Box>

                <Accordion sx={{
                    zIndex: 1
                }}>
                    <AccordionSummary
                        expandIcon={<ArrowDropDownIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <Typography variant="caption">
                            Abstract

                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails >
                        <Typography variant="caption"
                            align="left"
                        >
                            {stripHTMLTags(resource.abstract)}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Paper >
    )
}