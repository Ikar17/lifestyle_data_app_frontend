import { useEffect, useState } from "react";
import { Box, Button, Container, Typography, Radio, RadioGroup, FormControlLabel, Checkbox, Snackbar, Alert, TextField } from "@mui/material";
import { getSurveyById, sendSurveyResponse } from "../../api/survey"; 
import { useParams, useNavigate } from "react-router-dom";

export default function SurveyFillPage() {
  const { surveyId } = useParams();
  const { surveyLogId } = useParams();
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});
  const [snackbarStatus, setSnackbarStatus] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadSurvey();
  }, []);

  const loadSurvey = async () => {
    try {
      const fetchedSurvey = await getSurveyById(surveyId);
      setSurvey(fetchedSurvey);
      setResponses(
        fetchedSurvey.items.reduce((acc, item) => {
          acc[item.id] = item.type === "TEXT" ? "" : [];
          return acc;
        }, {})
      );
    } catch (error) {
      setSnackbarMessage("Nie udało się załadować ankiety");
      setSnackbarStatus(true);
    }
  };

  const handleInputChange = (questionId, value) => {
    setResponses({
      ...responses,
      [questionId]: value,
    });
  };

  const handleOptionChange = (questionId, option) => {
    const currentOptions = responses[questionId];
    const updatedOptions = currentOptions.includes(option)
      ? currentOptions.filter((opt) => opt !== option)
      : [...currentOptions, option];

    setResponses({
      ...responses,
      [questionId]: updatedOptions,
    });
  };

  const handleSubmit = async () => {
    const surveyResponseDTO = {
      surveyId: surveyId, 
      surveyLogId: surveyLogId,
      answers: survey.items.map((item) => ({
        id: item.id,
        type: item.type,
        text: item.type !== "TEXT" ? "" : responses[item.id],
        options: item.type === 'TEXT' ? [] : responses[item.id],
      })),
    };

    console.log(surveyResponseDTO);
    try{
        await sendSurveyResponse(surveyResponseDTO);
        setSnackbarMessage("Odpowiedzi zostały zapisane");
        setSnackbarStatus(true);
        setTimeout(() => navigate("/"), 3000);
    }catch(error){
        console.log(error);
        setSnackbarMessage("Błąd podczas zapisywania odpowiedzi");
        setSnackbarStatus(true);
    }

  };

  const closeSnackbar = () => {
    setSnackbarStatus(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {survey ? (
        <>
        <Typography variant="h4">{survey.title}</Typography>
        <Typography variant="body1" sx={{ mt: 2, mb: 4 }}>
            {survey.description}
        </Typography>
          {survey.items.map((item) => (
            <Box key={item.id} sx={{ mb: 3 }}>
              <Typography variant="h6">{item.text}</Typography>
              {item.type === 'TEXT' ? (
                <TextField
                  fullWidth
                  value={responses[item.id]}
                  onChange={(e) => handleInputChange(item.id, e.target.value)}
                  placeholder="Twoja odpowiedź"
                />
              ) : (
                item.options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={responses[item.id].includes(option)}
                        onChange={() => handleOptionChange(item.id, option)}
                      />
                    }
                    label={option}
                  />
                ))
              )}
            </Box>
          ))}

          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Wyślij odpowiedzi
          </Button>

          <Snackbar open={snackbarStatus} autoHideDuration={6000} onClose={closeSnackbar}>
            <Alert onClose={closeSnackbar} severity="info" variant="filled">
                {snackbarMessage}
            </Alert>
        </Snackbar>

        </>
      ) : (
        <Typography>Ładowanie ankiety...</Typography>
      )}
    </Container>
  );
};