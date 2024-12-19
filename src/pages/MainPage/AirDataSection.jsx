import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getLastUserAirData } from "../../api/air";

export default function AirDataSection(){

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try{
            const result = await getLastUserAirData();
            console.log(result);
        }catch(error){
            console.log(error);
        }
    }
    
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


                <Link to="/air">
                    <Button>
                        Więcej statystyk
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}