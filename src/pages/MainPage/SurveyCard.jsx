import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Grid } from '@mui/material';

const SurveyCard = ({ survey, onEdit, onManage, onResults, onFillSurvey, onViewResponses, userRole }) => {
  return (
    <Card variant="outlined" sx={{ padding: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {survey.survey.title}
        </Typography>
        <Typography color="text.secondary" sx={{ marginBottom: 1.5 }}>
          Utworzono: {new Date(survey.survey.createdAt).toLocaleDateString()}
        </Typography>
        <Typography color="text.secondary">
          Autor: {survey.author.name + " " + survey.author.surname}
        </Typography>
      </CardContent>
      <CardActions>
        {userRole === 'ANALYST' ? (
          <>
            <Button size="small" onClick={() => onEdit(survey.survey.id)}>
              Edytuj
            </Button>
            <Button size="small" onClick={() => onManage(survey.survey.id)}>
              Zarządzaj
            </Button>
            <Button size="small" onClick={() => onResults(survey.survey.id)}>
              Rezultaty
            </Button>
          </>
        ) : (
          <>
            {survey.surveyLog && survey.surveyLog.status === 'COMPLETE' ? (
              <Button size="small" onClick={() => onViewResponses(survey.surveyLog.id)}>
                Zobacz swoje odpowiedzi
              </Button>
            ) : (
              <Button size="small" onClick={() => onFillSurvey(survey.survey.id, survey.surveyLog.id)}>
                Wypełnij ankietę
              </Button>
            )}
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default SurveyCard;