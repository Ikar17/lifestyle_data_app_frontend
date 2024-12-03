import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, CircularProgress, List, ListItem, Container } from "@mui/material";
import { getSurveyAnswers, getSurveyById } from "../../api/survey";

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
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <CircularProgress />
        </Container>
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
    <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ marginBottom: "20px" }}>
            Przegląd odpowiedzi: {survey.title}
        </Typography>
        <List>
            {survey.items.map((item, index) => (
            <ListItem key={item.id} sx={{ marginBottom: "20px", borderBottom: "1px solid #ccc", display: "block" , backgroundColor: "white"}}>
                <Typography variant="h6">{`Pytanie ${index + 1}: ${item.text}`}</Typography>

                <Box sx={{ marginTop: "10px" }}>
                <Typography variant="subtitle1">Dostępne odpowiedzi:</Typography>
                <Box component="ul" sx={{ margin: 0, paddingLeft: "20px", color: "#463f3a" }}>
                    {item.options.map((option, i) => (
                    <li key={i}>{option}</li>
                    ))}
                </Box>
                </Box>

                <Box sx={{ marginTop: "10px" }}>
                <Typography variant="subtitle1">Twoja odpowiedź:</Typography>
                {getAnswerForQuestion(item.id).map((answer, i) => (
                    <Typography component="div" key={i} sx={{ color: "#463f3a" }} >
                    {answer.answer}
                    </Typography>
                ))}
                </Box>
            </ListItem>
            ))}
        </List>
    </Container>
  );
};

export default SurveyResponsePage;
