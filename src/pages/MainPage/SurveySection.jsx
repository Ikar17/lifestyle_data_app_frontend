import { Box, Button, Grid, Typography, Paper, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMySurveys } from "../../api/survey";
import SurveyCard from "./SurveyCard";
import { useAuth } from "../../contexts/AuthContext";

export default function SurveySection() {
  const [surveys, setSurveys] = useState([]);
  const [userRole, setUserRole] = useState("USER");
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    setUserRole(auth.role);
    getSurveys();
  }, []);

  const getSurveys = async () => {
    try {
      const results = await getMySurveys();
      setSurveys(results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/survey/creator/${id}`);
  };

  const handleManage = (id) => {
    navigate(`/survey/manage/${id}`);
  };

  const handleResults = (surveyId) => {
    navigate(`/survey/results/${surveyId}`);
  };

  const handleFillSurvey = (surveyId, surveyLogId) => {
    navigate(`/survey/fill/${surveyId}/${surveyLogId}`);
  };

  const handleViewResponses = (surveyId, surveyLogId) => {
    navigate(`/survey/response/${surveyId}/${surveyLogId}`);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        minHeight: "30vh",
        mt: "20px",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "primary.main",
          color: "white",
          p: 2,
        }}
      >
        <Typography component="h2" variant="h5">
          Ankiety
        </Typography>
        {userRole === "ANALYST" || userRole === "ADMIN" ? (
          <Link to="/survey/creator" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="secondary">
              Utwórz ankietę
            </Button>
          </Link>
        ) : (
          ""
        )}
      </Box>

      <Divider />

      <Grid container spacing={2} sx={{ p: 3 }}>
        {surveys.map((survey, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <SurveyCard
              survey={survey}
              onEdit={handleEdit}
              onManage={handleManage}
              onResults={handleResults}
              onFillSurvey={handleFillSurvey}
              onViewResponses={handleViewResponses}
              userRole={userRole}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}