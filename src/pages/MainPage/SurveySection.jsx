import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMySurveys } from "../../api/survey";
import SurveyCard from "./SurveyCard";

export default function SurveySection(){

    const [surveys, setSurveys] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getSurveys();
    },[])

    const getSurveys = async () => {
        try{
            const results = await getMySurveys();
            setSurveys(results);
        }catch(error){{
            console.log(error)
        }}
    }

    const handleEdit = (id) => {
        console.log('Edytuj ankietę:', id);
        navigate(`/survey/creator/${id}`);
      };
    
      const handleManage = (id) => {
        console.log('Zarządzaj ankietą:', id);
        // Logika zarządzania
      };
    
      const handleResults = (id) => {
        console.log('Rezultaty ankiety:', id);
        // Logika wyświetlania wyników
      };
    
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
                    Ankiety
                </Typography>
                <Link to='/survey/creator'>
                    <Button>
                        Utwórz ankietę
                    </Button>
                </Link>
                
            </Box>
            
            <Box>
                {surveys.map(survey => (
                    <Box key={survey.id} style={{ width: 'calc(100% - 10px)', padding: '10px' }}>
                        <SurveyCard 
                            survey={survey}
                            onEdit={handleEdit}
                            onManage={handleManage}
                            onResults={handleResults}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    )
}