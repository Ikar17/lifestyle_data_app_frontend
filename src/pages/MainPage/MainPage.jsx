import { Box, Container, Typography } from "@mui/material";
import SurveySection from "./SurveySection";

export default function MainPage(){

    return(
        <Container
            maxWidth='lg'
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mt: '30px'
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    bgcolor: 'white',
                    p: '10px',
                    boxSizing: 'border-box'
                }}
            >
                <Typography component="h6" variant="h6">
                    Witaj w aplikacji!
                </Typography>
            </Box>
            <SurveySection />
        </Container>
    )
}