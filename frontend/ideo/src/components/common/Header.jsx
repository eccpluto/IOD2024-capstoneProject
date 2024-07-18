import { Typography } from "@mui/material";
import React from "react";

// header just displays the current page to indicate user's location
export default function Header(props) {
    const { sections, title } = props;
    return (
        <React.Fragment>
            <Typography variant="h4" component="h1" sx={{
                mb: 2,
                color: props.color,
            }}>
                {props.title}
            </Typography>
        </React.Fragment>
    )
}