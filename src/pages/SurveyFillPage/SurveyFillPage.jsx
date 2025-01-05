import { useEffect, useState } from "react";
import { Box, Button, Container, Typography, Radio, RadioGroup, FormControlLabel, Checkbox, Snackbar, Paper, Alert, TextField } from "@mui/material";
import { getSurveyById, sendSurveyResponse } from "../../api/survey"; 
import { useParams, useNavigate } from "react-router-dom";
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SendIcon from '@mui/icons-material/Send';

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
        options: item.type === 'TEXT' ? [] : (item.type === 'SINGLE_CHOICE' ? [responses[item.id]] : responses[item.id]) ,
      })),
    };

    console.log(surveyResponseDTO);
    try{
        await sendSurveyResponse(surveyResponseDTO);
        setSnackbarMessage("Odpowiedzi zostały zapisane");
        setSnackbarStatus(true);
        setTimeout(() => navigate("/dashboard"), 3000);
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
    <Container maxWidth="md" sx={{ mt: 6 }}>
      {survey ? (
        <Paper elevation={6} sx={{ p: 5, borderRadius: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <AssignmentIcon sx={{ fontSize: 42, color: 'primary.main', mr: 2 }} />
            <Typography variant="h4" fontWeight="bold">
              {survey.title}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mb: 5, color: 'text.secondary' }}>
            {survey.description}
          </Typography>

          {survey.items.map((item) => (
            <Paper
              key={item.id}
              elevation={3}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 3,
                transition: 'all 0.3s',
                '&:hover': { boxShadow: 6 },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <QuestionAnswerIcon sx={{ fontSize: 30, color: 'secondary.main', mr: 1 }} />
                <Typography variant="h6" fontWeight="medium">
                  {item.text}
                </Typography>
              </Box>

              {item.type === 'TEXT' ? (
                <TextField
                  fullWidth
                  variant="outlined"
                  value={responses[item.id]}
                  onChange={(e) => handleInputChange(item.id, e.target.value)}
                  placeholder="Twoja odpowiedź"
                  sx={{ mt: 1 }}
                />
              ) : item.type === 'SINGLE_CHOICE' ? (
                <RadioGroup
                  value={responses[item.id] || ''}
                  onChange={(e) => handleInputChange(item.id, e.target.value)}
                >
                  {item.options.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio />}
                      label={option}
                      sx={{ ml: 1 }}
                    />
                  ))}
                </RadioGroup>
              ) : (
                item.options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={responses[item.id]?.includes(option)}
                        onChange={() => handleOptionChange(item.id, option)}
                      />
                    }
                    label={option}
                    sx={{ ml: 1 }}
                  />
                ))
              )}
            </Paper>
          ))}

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              startIcon={<SendIcon />}
              sx={{
                textTransform: 'none',
                borderRadius: 3,
                fontWeight: 'bold',
                px: 4,
                py: 1,
                boxShadow: 4,
                transition: 'background-color 0.3s',
                '&:hover': { backgroundColor: 'primary.dark' },
              }}
            >
              Wyślij odpowiedzi
            </Button>
          </Box>

          <Snackbar open={snackbarStatus} autoHideDuration={6000} onClose={closeSnackbar}>
            <Alert onClose={closeSnackbar} severity="success" variant="filled">
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 10 }}>
          <Typography variant="h6" sx={{ mr: 2 }}>
            Ładowanie ankiety...
          </Typography>
        </Box>
      )}
    </Container>
  );
};