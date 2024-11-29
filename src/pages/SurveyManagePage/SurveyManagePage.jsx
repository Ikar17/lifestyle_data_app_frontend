import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Grid, Button, TextField, Select, MenuItem, FormControl, InputLabel, Card, CardContent, CardActions, List, ListItem, ListItemText, 
  FormControlLabel,
  Switch,
  Snackbar,
  Alert
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { getSurveyById, sendingSurvey } from '../../api/survey';
import { getComunnes, getDistricts, getVoivodeships } from '../../api/address';

const SurveyManagePage = () => {
    const [voivodeships, setVoivodeships] = useState([]); 
    const [districts, setDistricts] = useState([]); 
    const [comunnes, setComunnes] = useState([]); 

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

    const { surveyId } = useParams(); 


    useEffect(() => {
        loadSurvey(surveyId);
        fetchVoivodeships();
    }, []);

  const loadSurvey = async (id) => {
    try {
      const result = await getSurveyById(id);
      console.log(result)
      setSurvey(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSurvey = () => {
    console.log('Ankieta usunięta:');
  };

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
  
    console.log("Wysyłanie ankiety:", payload);

    try{
      await sendingSurvey(payload);

      setStartDate('');
      setEndDate('');

      changeSnackbarType("success");
      changeSnackbarInfo("Ankieta została rozesłana.");
      changeSnackbarStatus(true);
    }catch(error){
      changeSnackbarType("error");
      changeSnackbarInfo("Błąd. Spróbuj ponownie później");
      changeSnackbarStatus(true)
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

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Zarządzaj ankietą: {survey ? survey.title : "Błąd ładowania"}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        Autor: {survey ? survey.metaData.author.name + " " + survey.metaData.author.surname : ""} | Utworzono: {survey ? new Date(survey.metaData.survey.createdAt).toLocaleDateString() : ""}
      </Typography>

      {/* Sekcja Usuwania Ankiety */}
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h6">Usuń ankietę</Typography>
          <Typography variant="body2" color="textSecondary">
            Usunięcie ankiety jest nieodwracalne.
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="error" onClick={handleDeleteSurvey}>
            Usuń ankietę
          </Button>
        </CardActions>
      </Card>

      {/* Sekcja Wysyłania Ankiety */}
      <Card variant="outlined" sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h6">Wyślij ankietę</Typography>
          <Typography variant="text">Określ grupę docelową po adresie zamieszkania</Typography>

          <FormControl fullWidth margin="normal">
            <InputLabel id="voivodeship-label">Województwo</InputLabel>
                <Select
                    labelId="voivodeship-label"
                    id="voivodeship"
                    name="voivodeship"
                    label="Województwo"
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

          <Typography variant="body2" color="text" sx={{marginBottom: 3, marginTop: 3}}>
            Cykliczność ankiety - możesz określić przez ile dni codziennie ankieta będzie rozsyłana automatycznie (ignorowane jeśli jest zaznaczone pole ankieta jednorazowa)
          </Typography>
          <TextField
            type="date"
            label="Data rozpoczęcia"
            fullWidth
            sx={{ marginBottom: 2 }}
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            type="date"
            label="Data zakończenia"
            fullWidth
            sx={{ marginBottom: 2 }}
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={handleSendSurvey}>
            Wyślij ankietę
          </Button>
        </CardActions>
      </Card>

      <Snackbar
            open={ snackbarStatus }
            autoHideDuration={ 6000 }
            onClose={ closeSnackbar }
        >
            <Alert
                onClose={ closeSnackbar }
                severity= { snackbarType }
                variant="filled"
                sx={{ width: '100%' }}
            >
                { snackbarInfo }
            </Alert>
        </Snackbar>

    </Container>
  );
};

export default SurveyManagePage;