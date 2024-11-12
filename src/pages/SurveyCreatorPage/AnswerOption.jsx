// src/components/AnswerOption.js
import { Box, Button, TextField } from '@mui/material';
import React from 'react';

const AnswerOption = ({ index, option, updateOption, removeOption }) => {
  return (
    <Box
        sx={{
            display: 'flex',
            gap: 3,
            my: "5px"
        }}
    >
      <TextField
        type="text"
        placeholder={`Opcja ${index + 1}`}
        value={option}
        onChange={(e) => updateOption(index, e.target.value)}
        sx={{ 
            flexGrow: 1 
        }}
      />
      <Button
        onClick={() => removeOption(index)}
        color="error"
        variant='outlined'
      >
        Usuń
      </Button>
    </Box>
  );
};

export default AnswerOption;