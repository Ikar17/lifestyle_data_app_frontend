import { Box, Button, Grid, Typography, Paper, Divider, Pagination, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMySurveys } from "../../api/survey";
import SurveyCard from "./SurveyCard";
import { useAuth } from "../../contexts/AuthContext";

export default function SurveySection() {
  const [surveys, setSurveys] = useState([]);
  const [userRole, setUserRole] = useState("USER");
  const [page, setPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [sort, setSort] = useState("asc");
  const navigate = useNavigate();
  const auth = useAuth();
  const size = 3;

  useEffect(() => {
    setUserRole(auth.role);
    getSurveys();
  }, []);

  useEffect(() => {
    getSurveys();
  }, [page, sort]);


  const getSurveys = async () => {
    try {
      const results = await getMySurveys(page-1, size, sort);
      setSurveys(results.content);
      setTotalElements(results.totalElements);
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

  const handlePageChange = (event, value) => {
    setPage(value);
  }

  const handleSortingChange = () => {
    if(sort === "asc") setSort("desc");
    else setSort("asc");
  }

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

      <Box sx={{ px:3, pt: 3}}>
        <Select
          value={sort}
          onChange={handleSortingChange}
        >
            <MenuItem value={"asc"}>Od najstarszych</MenuItem>
            <MenuItem value={"desc"}>Od najnowszych</MenuItem>
        </Select>
      </Box>
      
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

      <Box sx={{display: "flex", width: "100%", justifyContent: "center", marginBottom: "10px"}}>
        <Pagination 
          count={Math.ceil(totalElements/size)} 
          color="primary" 
          onChange={handlePageChange}/>
      </Box>
      

    </Paper>
  );
}