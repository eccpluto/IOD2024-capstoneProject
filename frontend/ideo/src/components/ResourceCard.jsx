import { Box, Paper, Typography } from "@mui/material";

// display a resource
// this could be from a search result(s), or from locally saved resources
export default function ResourceCard(props) {

    const resource = props.resource;
    const resourceType = props.resourceType;

    // unpayway provides some html-formatted strings
    const stripHTMLTags = (html) => {
        let temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || "";
    }

    // console.log(resource);

    return (
        <Paper
            elevation={5}
            // sx={onclick=alert("hello there")}
        >
            <Typography variant="h6">
                {/* {resourceType} */}
                {resource.title}
            </Typography>
            <Typography variant="subtitle1">
                {stripHTMLTags(resource.abstract)}
            </Typography>
        </Paper>
    )
}