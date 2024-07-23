import { Accordion, AccordionDetails, AccordionSummary, Box, Container, IconButton, Paper, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from "react";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { IFrameModal } from "./common";
import useMongoDb from "../hooks/useMongoDb";

// display a resource
// this could be from a search result(s), or from locally saved resources
export default function ResourceCard(props) {

    const [expanded, setExpanded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // hacky ensure initial population of library from db occurs once
    const [initialRender, setInitialRender] = useState(true);

    const resource = props.resource;
    const resourceType = props.resourceType;
    const userId = props.userId;
    
    // unpayway provides some html-formatted strings
    const stripHTMLTags = (html) => {
        let temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || "";
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    const handleOpenFile = () => {
        setIsModalOpen(true);
    }

    const handlePushToLibrary = () => {

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
                width={250}
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
                        <IconButton onClick={handlePushToLibrary}>
                            <AddCircleIcon />
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
            <IFrameModal isOpen={isModalOpen} handleClose={handleModalClose} url={resource.url} name={resource.title} />
        </Paper >
    )
}