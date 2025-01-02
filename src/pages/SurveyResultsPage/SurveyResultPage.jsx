import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress, Box, Card, CardContent, Grid, Alert, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getSurveyResults } from '../../api/survey';
import OpenAnswersList from './OpenAnswersList'; 
import Chart from './Chart'; 

const SurveyResultsPage = () => {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { surveyId } = useParams();

    useEffect(() => {
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
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold', color: 'primary.main' }}>
                Przegląd rezultatów: {results?.title}
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.dark' }}>Statystyki ogólne</Typography>
                            <Typography sx={{ mb: 1 }}>Liczba niewypełnionych ankiet: <strong>{results?.sentCount}</strong></Typography>
                            <Typography>Liczba wypełnionych ankiet: <strong>{results?.completeCount}</strong></Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                        <CardContent>
                            <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.dark' }}>Statystyki szczegółowe</Typography>
                            <Divider sx={{ mb: 2 }} />
                            {results?.questions.map((item, index) => (
                                <Box key={index} sx={{ mb: 4 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
                                        Pytanie nr {index + 1}: {item.question}
                                    </Typography>
                                    {item.questionType === 'TEXT' ? (
                                        <OpenAnswersList data={item.results} />
                                    ) : (
                                        <Chart data={item.results} />
                                    )}
                                    <Divider sx={{ mb: 2 }} />
                                </Box>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default SurveyResultsPage;
