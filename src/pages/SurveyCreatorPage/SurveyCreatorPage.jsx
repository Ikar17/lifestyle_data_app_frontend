import { useEffect, useState } from "react";
import Question from "./Question";
import { Alert, Box, Button, Container, Snackbar, TextField, Typography, Paper, IconButton, Tooltip } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import { createNewSurvey, getSurveyById, updateSurvey } from "../../api/survey";
import { useParams } from "react-router-dom";

export default function SurveyCreatorPage(){
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [snackbarStatus, changeSnackbarStatus] = useState(false);
  const [snackbarType, changeSnackbarType] = useState("error");
  const [snackbarInfo, changeSnackbarInfo] = useState("");
  const { surveyId } = useParams(); 

  useEffect(() => {
    if (surveyId) {
        loadSurvey(surveyId);
    }
  }, []);

  const closeSnackbar = () => {
    changeSnackbarStatus(false);
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

    // Dodaj nowe pytanie
  const addQuestion = (type) => {
    setQuestions([
      ...questions,
      {
        id: Date.now(),
        type,
        text: '',
        options: type === 'SINGLE_CHOICE' || type === 'MULTIPLE_CHOICE' ? [''] : [],
      },
    ]);
  };

  // Usuń pytanie
  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  // Aktualizuj treść pytania lub odpowiedzi
  const updateQuestion = (id, updatedQuestion) => {
    setQuestions(questions.map((q) => (q.id === id ? updatedQuestion : q)));
  };

  const sendData = async () => {
    try {
      const data = {
        items: questions,
        title,
        description,
      };

      let flag = true;
      if (surveyId) {
        flag = await updateSurvey(surveyId, data);
        if(flag) changeSnackbarInfo("Ankieta została zaktualizowana");
        else changeSnackbarInfo("Struktura ankiety, która jest rozesłana do użytkowników nie może być już edytowana");
      } else {
        await createNewSurvey(data);
        changeSnackbarInfo("Ankieta została utworzona");
        setQuestions([]);
        setTitle("");
        setDescription("");
      }

      if(flag){
        changeSnackbarType("success");
      }else{
        changeSnackbarType("error");
      }

      changeSnackbarStatus(true);

    } catch (error) {
      changeSnackbarInfo("Błąd zapisu ankiety. Spróbuj ponownie później.");
      changeSnackbarType("error");
      changeSnackbarStatus(true);
    }
  };

  const loadSurvey = async (id) => {
    try {
      const survey = await getSurveyById(id);
      setTitle(survey.title);
      setDescription(survey.description);
      setQuestions(survey.items);
    } catch (error) {
      changeSnackbarInfo("Błąd ładowania ankiety.");
      changeSnackbarType("error");
      changeSnackbarStatus(true);
    }
  };

  return (
    <Container
        maxWidth='lg'
        component={Paper}
        elevation={3}
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: '30px',
            py: '20px',
            borderRadius: '12px',
        }}
    >
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: '20px' }}>
            Kreator ankiety
        </Typography>

        <Box
            sx={{
                width: '80%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: 2,
                mt: '10px'
            }}
        >
            <TextField
                type="text"
                placeholder="Tytuł ankiety"
                value={title}
                onChange={handleTitleChange}
                variant="outlined"
                label="Tytuł"
            />
            <TextField
                type="text"
                placeholder="Opis ankiety"
                value={description}
                onChange={handleDescriptionChange}
                variant="outlined"
                label="Opis"
            />  
        </Box>

        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 3,
                my: '20px'
            }}
        >
            <Tooltip title="Dodaj pytanie otwarte">
              <Button 
                  color="info"
                  variant="contained" 
                  startIcon={<AddCircleOutlineIcon />} 
                  onClick={() => addQuestion('TEXT')}
              >
                  Pytanie otwarte
              </Button>
            </Tooltip>
            <Tooltip title="Dodaj pytanie jednokrotnego wyboru">
              <Button 
                  color="info"
                  variant="contained" 
                  startIcon={<AddCircleOutlineIcon />} 
                  onClick={() => addQuestion('SINGLE_CHOICE')}
              >
                  Jednokrotnego wyboru
              </Button>
            </Tooltip>
            <Tooltip title="Dodaj pytanie wielokrotnego wyboru">
              <Button 
                  color="info"
                  variant="contained" 
                  startIcon={<AddCircleOutlineIcon />} 
                  onClick={() => addQuestion('MULTIPLE_CHOICE')}
              >
                  Wielokrotnego wyboru
              </Button>
            </Tooltip>
        </Box>
      
        <Box sx={{ width: '90%' }}>
            {questions.map((question, index) => (
                <Box sx={{ my: '40px' }} key={question.id}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Pytanie {index + 1}
                    </Typography>
                    <Question
                        question={question}
                        updateQuestion={updateQuestion}
                        removeQuestion={removeQuestion}
                    />
                </Box>
            ))}
        </Box>
      
        {questions.length !== 0 && (
            <Button 
                color="success"
                variant="contained" 
                startIcon={<SaveIcon />} 
                onClick={() => sendData()}
            >
                Zapisz ankietę
            </Button>
        )}

        <Snackbar
            open={snackbarStatus}
            autoHideDuration={6000}
            onClose={closeSnackbar}
        >
            <Alert
                onClose={closeSnackbar}
                severity={snackbarType}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {snackbarInfo}
            </Alert>
        </Snackbar>
    </Container>
  );
}
