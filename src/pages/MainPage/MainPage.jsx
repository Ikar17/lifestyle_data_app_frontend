import { Box, Container, Typography } from "@mui/material";
import SurveySection from "./SurveySection";
import helloImage from "../../assets/hello.png"
import AirDataSection from "./AirDataSection";

export default function MainPage(){

    return(
        <>
            <Box
                sx={{
                    width: '100%',
                    height: '30vh',
                    backgroundImage:`url(${helloImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Typography 
                    component="p"
                    variant="h4"
                    sx={{
                        fontWeight: 'bold'
                    }}
                >
                    Dzień dobry!
                </Typography>
            </Box>
            <Container
                maxWidth='lg'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                
                <SurveySection />
                <AirDataSection />
            </Container>
        </>
        
    )
}