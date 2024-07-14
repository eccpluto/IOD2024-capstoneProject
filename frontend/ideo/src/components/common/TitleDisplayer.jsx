import { Typography } from "@mui/material";

export default function TitleDisplayer(props) {
    return(
        <Typography variant="h4" component="h1" sx={{
            mb: 2,
            color: props.color,
        }}>
            {props.title}
        </Typography>
    )
}