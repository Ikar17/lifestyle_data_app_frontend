import React from "react";
import { Card, CardContent, CardActions, Typography, Button, Box } from "@mui/material";

const SurveyCard = ({ survey, onEdit, onManage, onResults, onFillSurvey, onViewResponses, userRole }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        transition: "0.3s",
        '&:hover': {
          boxShadow: 6,
        },
        borderRadius: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {survey.survey.title}
        </Typography>
        <Typography color="text.secondary" sx={{ marginBottom: 1 }}>
          {userRole === "ANALYST" || userRole === "ADMIN" ?
              "Utworzono:  " + new Date(survey.survey.createdAt).toLocaleDateString()
            :
              "Otrzymano:  " + new Date(survey.surveyLog.sendAt).toLocaleDateString()
          }
        </Typography>
        <Typography color="text.secondary">
          Autor: {survey.author.name + " " + survey.author.surname}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
        {userRole === "ANALYST" || userRole === "ADMIN" ? (
          <Box>
            <Button size="small" onClick={() => onEdit(survey.survey.id)}>
              Edytuj
            </Button>
            <Button size="small" onClick={() => onManage(survey.survey.id)}>
              Zarządzaj
            </Button>
            <Button size="small" onClick={() => onResults(survey.survey.id)}>
              Rezultaty
            </Button>
          </Box>
        ) : survey.surveyLog && survey.surveyLog.status === "COMPLETE" ? (
          <Button
            size="small"
            variant="contained"
            onClick={() => onViewResponses(survey.survey.id, survey.surveyLog.id)}
          >
            Zobacz odpowiedzi
          </Button>
        ) : (
          <Button
            size="small"
            variant="contained"
            onClick={() => onFillSurvey(survey.survey.id, survey.surveyLog.id)}
          >
            Wypełnij ankietę
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default SurveyCard;
