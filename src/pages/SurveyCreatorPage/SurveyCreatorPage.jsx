import { useState } from "react";
import Question from "./Question";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

export default function SurveyCreatorPage(){
  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


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
        options: type === 'single' || type === 'multiple' ? [''] : [],
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
                onClick={() => addQuestion('text')}
            >
                Dodaj pytanie otwarte
            </Button>
            <Button 
                color="info"
                variant="contained" 
                onClick={() => addQuestion('single')}
            >
                Dodaj pytanie jednokrotnego wyboru
            </Button>
            <Button 
                color="info"
                variant="contained" 
                onClick={() => addQuestion('multiple')}
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
                onClick={() => console.log('Ankieta:', questions)}
            >
                Zapisz ankietę
            </Button>
            : null 
        }
      
    </Container>
  );
};
