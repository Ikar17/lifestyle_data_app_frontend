import { Box, Typography } from "@mui/material";

export default function AirDataSection(){
    
    return(
        <Box
            sx={{
                width: '100%',
                minHeight: '30vh',
                mt: '20px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    bgcolor: 'white',
                    p: '10px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Typography component="h2" variant="h5">
                    Jakość powietrza
                </Typography>
            </Box>
            <Box>

            </Box>
        </Box>
    )
}