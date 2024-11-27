import React from 'react';
import AnswerOption from './AnswerOption';
import { Box, Button, TextField, Typography } from '@mui/material';

const Question = ({ question, updateQuestion, removeQuestion }) => {
  const handleTextChange = (e) => {
    updateQuestion(question.id, { ...question, text: e.target.value });
  };

  // Dodaj nową opcję odpowiedzi dla pytań zamkniętych
  const addOption = () => {
    updateQuestion(question.id, { ...question, options: [...question.options, ''] });
  };

  // Aktualizuj opcję odpowiedzi
  const updateOption = (index, newOption) => {
    const newOptions = question.options.map((option, i) => (i === index ? newOption : option));
    updateQuestion(question.id, { ...question, options: newOptions });
  };

  // Usuń opcję odpowiedzi
  const removeOption = (index) => {
    const newOptions = question.options.filter((_, i) => i !== index);
    updateQuestion(question.id, { ...question, options: newOptions });
  };

  return (
    <Box>
      <TextField
        type="text"
        placeholder="Treść pytania"
        value={question.text}
        onChange={handleTextChange}
        sx={{
            width: '100%',
            mb: "8px"
        }}
        variant="filled"
      />

      {question.type === 'SINGLE_CHOICE' || question.type === 'MULTIPLE_CHOICE' ? (
        <Box>
          <Typography variant='h6'>Opcje odpowiedzi:</Typography>
          {question.options.map((option, index) => (
            <AnswerOption
              key={index}
              index={index}
              option={option}
              updateOption={updateOption}
              removeOption={removeOption}
            />
          ))}
            <Button 
                onClick={addOption}
                variant='outlined'
                sx={{
                    mb: "15px"
                }}
            >
                Dodaj opcję
            </Button>
        </Box>
      ) : null}

        <Button 
            onClick={() => removeQuestion(question.id)} 
            color="error"
            variant="contained"
        >
            Usuń pytanie
        </Button>
    </Box>
  );
};

export default Question;