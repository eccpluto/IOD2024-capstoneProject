import { Accordion, AccordionDetails, AccordionSummary, Box, Container, IconButton, Paper, Typography } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from "react";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { IFrameModal } from "./common";
import { useUserContext } from "../contexts/UserContext";

// display a resource
// this could be from a search result(s), or from locally saved resources
export default function ResourceCard(props) {

    // for determining if authenticated session functionality should be enabled
    // i.e. add to library
    const { user } = useUserContext();

    // for determining context of card
    const { resource, resourceType, cardVariant, callbackAddResourceToLibrary } = props;

    // iframe viewable state
    const [isModalOpen, setIsModalOpen] = useState(false);

    console.log(resource.name)

    // unpaywall provides some html-formatted strings, we need these in plain text
    const stripHTMLTags = (html) => {
        let temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || "";
    }

    const handleModalClose = () => {
        setIsModalOpen(false);
    }

    const handleOpenLinkModal = () => {
        setIsModalOpen(true);
    }

    const handleAddResourceToLibrary = () => {
        callbackAddResourceToLibrary(resource);
    }

    return (
        <Paper
            elevation={5}
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
                            {resource.name}
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
                        <IconButton onClick={handleOpenLinkModal}>
                            <FileOpenIcon />
                        </IconButton>
                        {(user.name && (cardVariant == "unpaywall")) && (
                            <IconButton
                                onClick={handleAddResourceToLibrary}>
                                <AddCircleIcon />
                            </IconButton>
                        )}

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
            <IFrameModal isOpen={isModalOpen} handleClose={handleModalClose} url={resource.url} name={resource.name} />
        </Paper >
    )
}