import { Box, Modal, Typography } from "@mui/material";
import { useState } from "react";

// pass a link to an instance of this component to open a modal showing that page
export default function IFrameModal(props) {

    const { isOpen, handleClose, url, name } = props;

    console.log(isOpen);

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: "80vw",
                height: "80vh",
                bgcolor: 'background.paper',
                border: '2px solid #345',
                boxShadow: 24,
                p: 4,
            }}>
                <Typography>
                    {name}
                </Typography>
                <iframe src={url} width="100%" height="100%"/>
            </Box>
        </Modal>
    )
}