import { Box, Button, Grid, Typography } from "@mui/material";
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
    <Box
      sx={{
        width: "100%",
        minHeight: "30vh",
        mt: "20px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          bgcolor: "white",
          p: "10px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography component="h2" variant="h5">
          Ankiety
        </Typography>
        {userRole === 'ANALYST' || userRole === 'ADMIN' ? 
            <Link to="/survey/creator">
                <Button>Utwórz ankietę</Button>
            </Link>
            :
            ""
        }
      </Box>

      <Box>
        {surveys.map((survey, index) => (
          <Box key={index} style={{ width: "calc(100% - 10px)", padding: "10px" }}>
            <SurveyCard
              survey={survey}
              onEdit={handleEdit}
              onManage={handleManage}
              onResults={handleResults}
              onFillSurvey={handleFillSurvey}
              onViewResponses={handleViewResponses}
              userRole={userRole}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}