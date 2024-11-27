import { useEffect, useState } from "react";
import Question from "./Question";
import { Alert, Box, Button, Container, Snackbar, TextField, Typography } from "@mui/material";
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
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: '30px'
        }}
    >
        <Typography variant="h4">
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
            />
            <TextField
                type="text"
                placeholder="Opis ankiety"
                value={description}
                onChange={handleDescriptionChange}
            />  
        </Box>

        <Box
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 3,
                my: '15px'
            }}
        >
            <Button 
                color="info"
                variant="contained" 
                onClick={() => addQuestion('TEXT')}
            >
                Dodaj pytanie otwarte
            </Button>
            <Button 
                color="info"
                variant="contained" 
                onClick={() => addQuestion('SINGLE_CHOICE')}
            >
                Dodaj pytanie jednokrotnego wyboru
            </Button>
            <Button 
                color="info"
                variant="contained" 
                onClick={() => addQuestion('MULTIPLE_CHOICE')}
            >
                Dodaj pytanie wielokrotnego wyboru
            </Button>
        </Box>
      
        <Box
            sx={{
                width: '90%'
            }}
        >
            {questions.map((question, index) => (
                <Box
                    sx={{
                        my:'60px'
                    }}
                >
                    <Typography>Pytanie { index + 1}</Typography>
                    <Question
                    key={question.id}
                    question={question}
                    updateQuestion={updateQuestion}
                    removeQuestion={removeQuestion}
                    />
                </Box>
                
            ))}
        </Box>
      

        {questions.length !== 0 ?
            <Button 
                color="info"
                variant="contained" 
                onClick={() => sendData()}
            >
                Zapisz ankietę
            </Button>
            : null 
        }

        <Snackbar
            open={ snackbarStatus }
            autoHideDuration={ 6000 }
            onClose={ closeSnackbar }
        >
            <Alert
                onClose={ closeSnackbar }
                severity= { snackbarType }
                variant="filled"
                sx={{ width: '100%' }}
            >
                { snackbarInfo }
            </Alert>
        </Snackbar>
      
    </Container>
  );
};
