import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLastUserAirData } from "../../api/air";
import AirQualityCard from "./AirQualityCard";

export default function AirDataSection(){

    const [data, setData] = useState(null);

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try{
            const result = await getLastUserAirData();
            setData(result);
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
            }}
        >
            <Box>
                <AirQualityCard data={data}/>

                <Link to="/air">
                    <Button variant="outlined">
                        Więcej statystyk o jakości powietrza
                    </Button>
                </Link>
            </Box>
        </Box>
    )
}