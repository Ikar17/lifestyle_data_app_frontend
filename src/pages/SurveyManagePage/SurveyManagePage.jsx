import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography,
  Button, 
  TextField, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Card, 
  CardContent, 
  CardActions, 
  FormControlLabel,
  Switch,
  Snackbar,
  Alert,
  Pagination,
  Box,
  Paper,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import { useNavigate, useParams } from 'react-router-dom';
import { deleteSurveySendingByDate, getSurveyById, getSurveySendingStats, removeSurveyById, sendingSurvey } from '../../api/survey';
import { getComunnes, getDistricts, getVoivodeships } from '../../api/address';
import dayjs from 'dayjs';
import { useAuth } from '../../contexts/AuthContext';

const SurveyManagePage = () => {
    const [voivodeships, setVoivodeships] = useState([""]); 
    const [districts, setDistricts] = useState([""]); 
    const [comunnes, setComunnes] = useState([""]); 

    const [voivodeship, setVoivodeship] = useState('');
    const [district, setDistrict] = useState('');
    const [comunne, setComunne] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isOneTime, setIsOneTime] = useState(false);
    const [survey, setSurvey] = useState(null);

    const [snackbarStatus, changeSnackbarStatus] = useState(false);
    const [snackbarType, changeSnackbarType] = useState("error");
    const [snackbarInfo, changeSnackbarInfo] = useState("");

    const [stats, setStats] = useState([]);
    const [page, setPage] = useState(1);
    const [totalElements, setTotalElements] = useState(0);

    const [openDialog, setOpenDialog] = useState(false);

    const { surveyId } = useParams(); 
    const navigate = useNavigate();
    const auth = useAuth();

    const size = 5; 

    useEffect(() => {
        if(auth.role !== "ADMIN" && auth.role !== "ANALYST"){
          navigate("/");
        }
        loadSurvey(surveyId);
        fetchVoivodeships();
        loadStats(surveyId);
    }, []);

    useEffect(() => {
      loadStats(surveyId);
    }, [page]);

  const loadSurvey = async (id) => {
    try {
      const result = await getSurveyById(id);
      setSurvey(result);
    } catch (error) {
      changeSnackbarType("error");
      changeSnackbarInfo("Problem z pobraniem informacji o ankiecie. Spróbuj ponownie później");
      changeSnackbarStatus(true);
    }
  };

  const loadStats = async (id) => {
    try{
      const results = await getSurveySendingStats(id, page-1, size);
      console.log(results);
      setStats(results.content);
      setTotalElements(results.totalElements);
    }catch(error){
      changeSnackbarType("error");
      changeSnackbarInfo("Problem z pobraniem statystyk wysyłek ankiet. Spróbuj ponownie później");
      changeSnackbarStatus(true);
    }
  }

  const handleDeleteSurvey = async () => {
    try{
      await removeSurveyById(surveyId);
      changeSnackbarType("success");
      changeSnackbarInfo("Ankieta została usunięta");
      changeSnackbarStatus(true);
      setTimeout(() => navigate("/dashboard"), 3000);
    }catch(error){
      changeSnackbarType("error");
      changeSnackbarInfo("Problem z usunięciem ankiety. Spróbuj ponownie później");
      changeSnackbarStatus(true);
    }

    handleCloseDialog();
  };

  const handleDeleteSending = async (date) => {
    try{
      await deleteSurveySendingByDate(surveyId, date);

      changeSnackbarType("success");
      changeSnackbarInfo("Ankieta dla dnia: " + date + " została usunięta");

      loadStats(surveyId);
    }catch(error){
      changeSnackbarType("error");
      changeSnackbarInfo("Błąd usuwania ankiety. Spróbuj ponownie później");
    }
    finally{
      changeSnackbarStatus(true);
    }
  }

  const handleSendSurvey = async () => {
    const payload = {
      surveyId: surveyId,
      voivodeship: voivodeship,
      district: district,
      commune: comunne,
      isOneTime: isOneTime,
      startDate: startDate,
      endDate: endDate
    };

    if(!isOneTime){
      if(startDate == null || endDate == null || startDate == '' || endDate == ''){
        changeSnackbarType("error");
        changeSnackbarInfo("Niepoprawne daty");
        changeSnackbarStatus(true);
        return;
      }

      const date1 = dayjs(startDate);
      const date2 = dayjs(endDate);
      if (date2.isBefore(date1)){
        changeSnackbarType("error");
        changeSnackbarInfo("Niepoprawne daty");
        changeSnackbarStatus(true);
        return;
      }
    }

    try{
      await sendingSurvey(payload);

      setStartDate('');
      setEndDate('');

      changeSnackbarType("success");
      changeSnackbarInfo("Ankieta została rozesłana.");

      loadStats(surveyId);
    }catch(error){
      changeSnackbarType("error");
      changeSnackbarInfo("Błąd. Spróbuj ponownie później");
      changeSnackbarStatus(true)
    }finally{
      changeSnackbarStatus(true);
    }
  }

  const fetchVoivodeships = async () => {
    const data = await getVoivodeships();
    setVoivodeships(data);
  };

  const fetchDistricts = async (event) => {
    const selectedValue = event.target.value;
    setVoivodeship(selectedValue);
    const data = await getDistricts(selectedValue);
    if(data != null) setDistricts(data);
  }

  const fetchComunnes = async (event) => {
    const selectedValue = event.target.value;
    setDistrict(selectedValue);
    const data = await getComunnes(selectedValue);
    if(data != null) setComunnes(data);
  }

  const closeSnackbar = () => {
    changeSnackbarStatus(false);
  }

  const handlePageChange = (e, value) => {
    setPage(value);
  }

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Paper sx={{p: 3, mb: 3, borderRadius: 4 }}>
        <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              textAlign: 'center',  
              marginBottom: 2 
            }}
          >
            Zarządzaj ankietą: {survey ? survey.title : "Błąd ładowania"}
          </Typography>

          <Typography 
            variant="subtitle1" 
            color="textSecondary" 
            gutterBottom 
            sx={{ 
              textAlign: 'center', 
              marginBottom: 4 
            }}
          >

            Autor: {survey ? `${survey.metaData.author.name} ${survey.metaData.author.surname}` : ""} | 
            Utworzono: {survey ? new Date(survey.metaData.survey.createdAt).toLocaleDateString() : ""}
      </Typography>
    </Paper>

     {/* Sekcja Usuwania Ankiety */}
      <Card variant="outlined" sx={{ marginBottom: 3, borderRadius: 2, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6">
            <DeleteIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
            Usuń ankietę
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Usunięcie ankiety jest nieodwracalne.
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="error" startIcon={<DeleteIcon />} onClick={handleOpenDialog}>
            Usuń ankietę
          </Button>
        </CardActions>
      </Card>

      {/* Dialog potwierdzenia usunięcia ankiety */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Potwierdzenie usunięcia</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="textSecondary">
            Czy na pewno chcesz usunąć tę ankietę? To działanie jest nieodwracalne.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Anuluj
          </Button>
          <Button onClick={handleDeleteSurvey} color="error">
            Usuń
          </Button>
        </DialogActions>
      </Dialog>

      {/* Sekcja Wysyłania Ankiety */}
      <Card variant="outlined" sx={{ marginBottom: 3, borderRadius: 2, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6">
            <SendIcon sx={{ verticalAlign: 'middle', marginRight: 1 }} />
            Wyślij ankietę
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Określ grupę docelową po adresie zamieszkania
          </Typography>

          <FormControl fullWidth margin="normal">
            <InputLabel id="voivodeship-label">Województwo</InputLabel>
            <Select
              labelId="voivodeship-label"
              id="voivodeship"
              name="voivodeship"
              label="Województwo"
              startAdornment={<LocationOnIcon />}
              onChange={fetchDistricts}
            >
              {voivodeships.map((voivodeship, index) => (
                <MenuItem key={index} value={voivodeship.name}>{voivodeship.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="district-label">Powiat</InputLabel>
            <Select
              labelId="district-label"
              id="district"
              name="district"
              label="Powiat"
              startAdornment={<LocationOnIcon />}
              onChange={fetchComunnes}
            >
              {districts.map((district, index) => (
                <MenuItem key={index} value={district.name}>{district.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel id="comunne-label">Gmina</InputLabel>
            <Select
              labelId="comunne-label"
              id="comunne"
              name="comunne"
              label="Gmina"
              startAdornment={<LocationOnIcon />}
              onChange={(e) => setComunne(e.target.value)}
            >
              {comunnes.map((comunne, index) => (
                <MenuItem key={index} value={comunne.name}>{comunne.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch
                checked={isOneTime}
                onChange={(e) => setIsOneTime(e.target.checked)}
                color="primary"
              />
            }
            label="Ankieta jednorazowa"
          />

          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 3, marginTop: 3 }}>
            Cykliczność ankiety - możesz określić przez ile dni codziennie ankieta będzie rozsyłana automatycznie
          </Typography>
          <TextField
            type="date"
            label="Data rozpoczęcia"
            fullWidth
            sx={{ marginBottom: 2 }}
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputProps={{
              startAdornment: <CalendarTodayIcon sx={{ marginRight: 1 }} />
            }}
          />
          <TextField
            type="date"
            label="Data zakończenia"
            fullWidth
            sx={{ marginBottom: 2 }}
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputProps={{
              startAdornment: <CalendarTodayIcon sx={{ marginRight: 1 }} />
            }}
          />
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" startIcon={<SendIcon />} onClick={handleSendSurvey}>
            Wyślij ankietę
          </Button>
        </CardActions>
      </Card>

      {/* Sekcja statystyk wysyłek */}
  <Card variant="outlined" sx={{ marginBottom: 4, borderRadius: 2, boxShadow: 2 }}>
  <CardContent>
    <Typography 
      variant="h6" 
      sx={{ display: 'flex', alignItems: 'center' }}
    >
      <SendIcon sx={{ marginRight: 1, color: 'primary.main' }} />
      Statystyki wysyłek ankiety
    </Typography>
    <Typography variant="caption" sx={{ display: 'block', my: 1 }}>
      Wskazówka: Usunięcie wysyłek przeszłych lub z dnia dzisiejszego spowoduje utratę danych o wypełnionych ankietach z tych dni.
    </Typography>

    {stats.length > 0 ? (
      stats.map((item, index) => (
        <Card 
            key={index} 
            variant="outlined" 
            sx={{ 
              marginBottom: 2, 
              padding: 2, 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              borderRadius: 2,
              backgroundColor: '#f9f9f9'
            }}
          >
            <Box>
              <Typography variant="body1">
                <strong>Data otrzymania ankiety:</strong> {item.sendAt}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                <strong>Liczba wysyłek:</strong> {item.count}
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              color="error" 
              startIcon={<DeleteIcon />} 
              onClick={() => handleDeleteSending(item.sendAt)}
            >
              Usuń
            </Button>
          </Card>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center', marginTop: 2 }}>
          Brak danych o wysyłkach
        </Typography>
      )}
      </CardContent>

      <Pagination 
        count={Math.ceil(totalElements / size)} 
        color="primary" 
        sx={{ display: 'flex', justifyContent: 'center', my: 2 }}
        onChange={handlePageChange}
      />

    </Card>

      <Snackbar
        open={snackbarStatus}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbarType}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarInfo}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SurveyManagePage;