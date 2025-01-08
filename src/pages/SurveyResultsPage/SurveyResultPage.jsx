import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Box, Card, CardContent, Grid, Alert, Divider, Button, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { downloadCSVFile, getSurveyResults} from '../../api/survey';
import OpenAnswersList from './OpenAnswersList'; 
import Chart from './Chart'; 
import PollIcon from '@mui/icons-material/Poll';
import BarChartIcon from '@mui/icons-material/BarChart';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import QuizIcon from '@mui/icons-material/Quiz';
import { useAuth } from '../../contexts/AuthContext';

const SurveyResultsPage = () => {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { surveyId } = useParams();
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.role !== "ADMIN" && auth.role !== "ANALYST"){
            navigate("/");
          }
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await getSurveyResults(surveyId);
            setResults(data);
        } catch (error) {
            setError("Nie udało się załadować danych. Spróbuj ponownie później.");
        } finally {
            setLoading(false);
        }
    };

    const getCSVFile = () => {
        try{
            downloadCSVFile(surveyId);
        }catch(error){
            console.log(error);
        }
    }

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress color="primary" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container maxWidth="md" sx={{ mt: 4 }}>
                <Alert severity="error" sx={{ borderRadius: 2, fontWeight: 'bold' }}>
                    {error}
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 6 }}>
            <Paper elevation={6} sx={{ p: 5, borderRadius: 4 }}>
                <Typography 
                    variant="h4" 
                    sx={{ mb: 5, textAlign: 'center', fontWeight: 'bold', color: 'primary.main' }}
                >
                    Przegląd Rezultatów: {results?.title}
                </Typography>
    
                <Grid container spacing={4}>
                    {/* Karta statystyk ogólnych */}
                    <Grid item xs={12} sm={6}>
                        <Paper elevation={4} sx={{ borderRadius: 4, p: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <BarChartIcon 
                                    color="primary" 
                                    sx={{ fontSize: 32, mr: 2 }} 
                                />
                                <Typography 
                                    variant="h5" 
                                    sx={{ fontWeight: 'bold', color: 'primary.dark' }}
                                >
                                    Statystyki Ogólne
                                </Typography>
                            </Box>
                            <Typography sx={{ mb: 1 }}>
                                Wysłane ankiety: <strong>{results?.sentCount}</strong>
                            </Typography>
                            <Typography>
                                Wypełnione ankiety: <strong>{results?.completeCount}</strong>
                            </Typography>
                        </Paper>
                    </Grid>
    
                    {/* Karta statystyk szczegółowych */}
                    <Grid item xs={12}>
                        <Paper elevation={4} sx={{ borderRadius: 4, p: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <PollIcon 
                                    color="primary" 
                                    sx={{ fontSize: 36, mr: 2 }} 
                                />
                                <Typography 
                                    variant="h5" 
                                    sx={{ fontWeight: 'bold', color: 'primary.dark' }}
                                >
                                    Statystyki Szczegółowe
                                </Typography>
                            </Box>
                            <Divider sx={{ mb: 3 }} />
                            {results?.questions.map((item, index) => (
                                <Box key={index} sx={{ mb: 5 }}>
                                    <Typography 
                                        variant="h6" 
                                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                                    >
                                        <QuizIcon
                                            color="secondary" 
                                            sx={{ fontSize: 25, mr: 1 }}
                                        />
                                        Pytanie {index + 1}: {item.question}
                                    </Typography>
                                    {item.questionType === 'TEXT' ? (
                                        <OpenAnswersList data={item.results} />
                                    ) : (
                                        <Chart data={item.results} />
                                    )}
                                    {index < results.questions.length - 1 && <Divider sx={{ mt: 3 }} />}
                                </Box>
                            ))}
                        </Paper>
                    </Grid>
                </Grid>
    
                {/* Przycisk pobierania CSV */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                    <Button 
                        onClick={getCSVFile} 
                        variant="contained" 
                        color="secondary"
                        size="large"
                        startIcon={<FileDownloadIcon />}
                        sx={{ textTransform: 'none', borderRadius: 3, boxShadow: 4 }}
                    >
                        Pobierz wyniki (CSV)
                    </Button>
                </Box>
    
                <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
                    Wskazówka: Aby poprawnie używać danych w Excelu, zaimportuj plik CSV. Separatorem jest średnik (;).
                </Typography>
            </Paper>
        </Container>
    );
};

export default SurveyResultsPage;
