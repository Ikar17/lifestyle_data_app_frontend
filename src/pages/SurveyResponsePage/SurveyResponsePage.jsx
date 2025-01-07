import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, List, ListItem, Container, Paper } from "@mui/material";
import { getSurveyAnswers, getSurveyById } from "../../api/survey";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import DoneIcon from '@mui/icons-material/Done';
import ListAltIcon from '@mui/icons-material/ListAlt';

const SurveyResponsePage = () => {
  const { surveyId, surveyLogId } = useParams(); 
  const [survey, setSurvey] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        // Pobierz szczegóły ankiety
        const surveyRes = await getSurveyById(surveyId);
        setSurvey(surveyRes);

        // Pobierz odpowiedzi użytkownika
        const responseRes = await getSurveyAnswers(surveyLogId);
        setResponse(responseRes);
      } catch (err) {
        setError("Nie udało się załadować danych. Spróbuj ponownie później.");
      } finally {
        setLoading(false);
      }
    };

    fetchSurveyData();
  }, [surveyId, surveyLogId]);

  if (loading) {
    return(
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
            <CircularProgress />
        </Box>
    ) 
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const getAnswerForQuestion = (questionId) => {
    const answer = response.filter((ans) => ans.question.id === questionId);
    if(answer && answer[0]){
        if(answer[0].answer) return [{ answer: answer[0].answer }];
        else return answer[0].answerOption
    }else{
        return []
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
        <Paper elevation={6} sx={{ p: 5, borderRadius: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <ListAltIcon sx={{ fontSize: 42, color: 'primary.main', mr: 2 }} />
                <Typography variant="h4" fontWeight="bold">
                    Przegląd odpowiedzi: {survey.title}
                </Typography>
            </Box>

            <List>
                {survey.items.map((item, index) => (
                    <Paper
                        key={item.id}
                        elevation={3}
                        sx={{
                            mb: 4,
                            borderRadius: 3,
                            p: 3,
                            transition: 'all 0.3s',
                            '&:hover': { boxShadow: 6 },
                        }}
                    >
                        <ListItem
                            sx={{
                                display: 'block',
                                borderBottom: '1px solid #e0e0e0',
                                pb: 2,
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <QuestionMarkIcon sx={{ color: 'secondary.main', mr: 1 }} />
                                <Typography variant="h6" fontWeight="medium">
                                    {`Pytanie ${index + 1}: ${item.text}`}
                                </Typography>
                            </Box>

                            <Box sx={{ mt: 2 }}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Dostępne odpowiedzi:
                                </Typography>
                                <Box
                                    component="ul"
                                    sx={{
                                        margin: 0,
                                        pl: 3,
                                        color: 'text.secondary',
                                        listStyle: 'circle',
                                    }}
                                >
                                    {item.options.map((option, i) => (
                                        <li key={i}>{option}</li>
                                    ))}
                                </Box>
                            </Box>

                            <Box sx={{ mt: 3 }}>
                                <Typography variant="subtitle1" fontWeight="bold">
                                    Twoja odpowiedź:
                                </Typography>
                                {getAnswerForQuestion(item.id).map((answer, i) => (
                                    <Box
                                        key={i}
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            mt: 1,
                                            color: 'text.primary',
                                        }}
                                    >
                                        <DoneIcon sx={{ color: 'success.main', mr: 1 }} />
                                        <Typography>{answer.answer}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        </ListItem>
                    </Paper>
                ))}
            </List>
        </Paper>
    </Container>
);
};

export default SurveyResponsePage;
