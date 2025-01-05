import React from 'react';
import AnswerOption from './AnswerOption';
import { Box, Button, TextField, Typography, IconButton, Paper, Tooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

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
    <Paper 
      elevation={3}
      sx={{
        p: 3,
        borderRadius: '12px',
        backgroundColor: '#f9f9f9',
        mb: 3,
      }}
    >
      <TextField
        type="text"
        placeholder="Treść pytania"
        value={question.text}
        onChange={handleTextChange}
        fullWidth
        variant="outlined"
        label="Treść pytania"
        sx={{ mb: 2 }}
      />

      {(question.type === 'SINGLE_CHOICE' || question.type === 'MULTIPLE_CHOICE') && (
        <Box>
          <Typography variant='subtitle1' sx={{ mb: 1 }}>Opcje odpowiedzi:</Typography>
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
            startIcon={<AddCircleOutlineIcon />}
            sx={{ mt: 2 }}
          >
            Dodaj opcję
          </Button>
        </Box>
      )}

      <Tooltip title="Usuń pytanie">
        <IconButton
          onClick={() => removeQuestion(question.id)} 
          color="error"
          sx={{ mt: 2 }}
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default Question;