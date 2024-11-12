
import { Container, Typography } from "@mui/material";

export default function Footer(){
    return(
        <Container 
            maxWidth="lg"
            sx = {{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "14vh",
                gap: "2px"
            }}
        >
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © LifestyleData '}
                {new Date().getFullYear()}
            </Typography>
        </Container>
    )
}