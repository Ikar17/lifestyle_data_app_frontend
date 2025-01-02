import { Box, Container, Typography, Paper } from "@mui/material";
import SurveySection from "./SurveySection";
import helloImage from "../../assets/hello.png"
import AirDataSection from "./AirDataSection";

export default function MainPage() {
    return (
        <>
            <Container
                maxWidth='lg'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    py: 4
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        width: '100%',
                        textAlign: 'center',
                        p: 4,
                        borderRadius: 3,
                        backgroundColor: 'primary.light',
                        color: 'primary.contrastText',
                    }}
                >
                    <Typography variant="h4" gutterBottom>
                        Witaj na stronie głównej!
                    </Typography>
                    <Typography variant="subtitle1">
                        Monitoruj jakość powietrza i zarządzaj ankietami.
                    </Typography>
                </Paper>
                <AirDataSection />
                <SurveySection />
            </Container>
        </>
    )
}
