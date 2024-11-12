import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function SurveySection(){
    
    return(
        <Box
            sx={{
                width: '100%',
                minHeight: '30vh',
                mt: '20px'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    bgcolor: 'white',
                    p: '10px'
                }}
            >
                <Typography component="h2" variant="h5">
                    Ankiety
                </Typography>
                <Link to='/survey/creator'>
                    <Button>
                        Utwórz ankietę
                    </Button>
                </Link>
                
            </Box>
            
            <Box>

            </Box>
        </Box>
    )
}