import { Box, Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLastUserAirData } from "../../api/air";
import AirQualityCard from "./AirQualityCard";

export default function AirDataSection(){

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try{
            const result = await getLastUserAirData();
            setData(result);
            setLoading(false);
        }catch(error){
            console.log(error);
        }
    }
    
    return(
        <Box
            sx={{
                width: '100%',
                minHeight: '70vh',
                mt: '20px',
            }}
        >
            <Box>
                {loading ? 
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                        <CircularProgress />
                    </Box>
                :
                    <AirQualityCard data={data}/>
                }
                <Link to="/air">
                    <Button variant="outlined">
                        Więcej statystyk o jakości powietrza
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}