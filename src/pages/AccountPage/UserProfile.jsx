
import React, { useState, useEffect } from "react";
import { 
  TextField, Button, Typography, Container, Paper, MenuItem, InputLabel, 
  FormControl, Select, Divider, Snackbar, Alert, Dialog, DialogTitle, DialogContent, 
  DialogActions 
} from "@mui/material";
import { changePassword, deleteUserAccount, getUserDetails, updateUserDetails } from "../../api/user";
import { getComunnes, getDistricts, getVoivodeships } from "../../api/address";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {

    const [voivodeships, setVoivodeships] = useState([]); 
    const [districts, setDistricts] = useState([]); 
    const [comunnes, setComunnes] = useState([]); 

    const [voivodeship, setVoivodeship] = useState('');
    const [district, setDistrict] = useState('');
    const [comunne, setComunne] = useState('');

  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    birthDate: "",
    email: "",
    voivodeship: "",
    district: "",
    comunne: ""
  });

  const [userPassword, setUserPassword] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [userConfirmedPassword, setUserConfirmedPassword] = useState("");

  const [snackbarStatus, changeSnackbarStatus] = useState(false);
  const [snackbarType, changeSnackbarType] = useState("error");
  const [snackbarInfo, changeSnackbarInfo] = useState("");

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); 

  const auth = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchVoivodeships();
    fetchData();
  }, []);

  const fetchVoivodeships = async () => {
    const data = await getVoivodeships();
    setVoivodeships(data);
  };
      
  const fetchDistricts = async (voivodeship) => {
    const data = await getDistricts(voivodeship);
    if(data != null) setDistricts(data);
  }
      
  const fetchComunnes = async (district) => {
    const data = await getComunnes(district);
    if(data != null) setComunnes(data);
  }

  const fetchData = async () => {
    try{
      const result = await getUserDetails();

      setVoivodeship(result.address.voivodeship.name);
      await fetchDistricts(result.address.voivodeship.name);

      setDistrict(result.address.district.name);
      await fetchComunnes(result.address.district.name);

      setComunne(result.address.comunne.name);

      const userDetails = {
        name: result.name,
        surname: result.surname,
        birthDate: result.birthDate,
        email: result.email
      }
      setUserData(userDetails);
    }catch(error){
      console.log(error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async () => {
    try{
      userData.voivodeship = voivodeship;
      userData.district = district;
      userData.comunne = comunne;

      await updateUserDetails(userData);

      changeSnackbarType("success");
      changeSnackbarInfo("Dane zostały zmienione");
      changeSnackbarStatus(true);
    }catch(error){
      changeSnackbarType("error");
      changeSnackbarInfo("Błąd aktualizacji. Sprawdź dane lub spróbuj ponownie później");
      changeSnackbarStatus(true);
    }
  };

  const handleChangePassword = async () => {
    try{
      if(newUserPassword !== userConfirmedPassword){
        changeSnackbarType("error");
        changeSnackbarInfo("Hasło nie są zgodne.");
        changeSnackbarStatus(true);
        return;
      }

      await changePassword(userPassword, newUserPassword);
      changeSnackbarType("success");
      changeSnackbarInfo("Hasło zostało zmienione.");
      changeSnackbarStatus(true);
      setUserPassword("");
      setNewUserPassword("");
      setUserConfirmedPassword("");
    }catch(error){
      changeSnackbarType("error");
      changeSnackbarInfo("Hasło nie zostało zmienione. Niepoprawne hasło lub nowe hasło jest za krótkie (min. 6 znaków)");
      changeSnackbarStatus(true);
    }
  };


  const handleDeleteAccount = async () => {
    try {
      console.log("Usuwam");
      await deleteUserAccount(); 
      changeSnackbarType("success");
      changeSnackbarInfo("Konto zostało pomyślnie usunięte.");
      changeSnackbarStatus(true);

      setTimeout(() => navigate("/"), 2000);
      auth.logout();

    } catch (error) {
      changeSnackbarType("error");
      changeSnackbarInfo("Nie udało się usunąć konta. Spróbuj ponownie później.");
      changeSnackbarStatus(true);
    }
    setDeleteModalOpen(false); 
  };

  return (
    <Container maxWidth="sm" sx={{marginTop: "15px"}}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h5" gutterBottom>
          Edytuj profil
        </Typography>

        <TextField
            disabled
            fullWidth
            margin="normal"
            label="Email"
            value={userData.email}
        />

        <TextField
            fullWidth
            margin="normal"
            label="Imię"
            name="name"
            value={userData.name}
            onChange={handleChange}
        />

        <TextField
            fullWidth
            margin="normal"
            label="Nazwisko"
            name="surname"
            value={userData.surname}
            onChange={handleChange}
        />

        <TextField
            fullWidth
            type="date"
            margin="normal"
            label="Data urodzenia"
            name="birthDate"
            InputLabelProps={{ shrink: true }}
            value={userData.birthDate}
            onChange={handleChange}
        />

        <FormControl fullWidth margin="normal">
        <InputLabel id="voivodeship-label">Województwo</InputLabel>
            <Select
                labelId="voivodeship-label"
                id="voivodeship"
                name="voivodeship"
                label="Województwo"
                value={voivodeship || ''}
                onChange={(event) => {
                  fetchDistricts(event.target.value);
                  setVoivodeship(event.target.value);
                  setDistrict('');
                  setComunne('');
                }}
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
                    value={district || ''}
                    onChange={(event) => {
                      fetchComunnes(event.target.value);
                      setDistrict(event.target.value);
                      setComunne('');
                    }}
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
                    value={comunne || ''}
                    onChange={(e) => setComunne(e.target.value)}
                    >
                    {comunnes.map((comunne, index) => (
                        <MenuItem key={index} value={comunne.name}>{comunne.name}</MenuItem>
                    ))}
                </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
              Zapisz zmiany
          </Button>
        </FormControl>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="h5" gutterBottom>
          Zmień hasło
        </Typography>

        <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Aktualne hasło"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
        />

        <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Nowe hasło"
            value={newUserPassword}
            onChange={(e) => setNewUserPassword(e.target.value)}
        />
        <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Potwierdź nowe hasło"
            value={userConfirmedPassword}
            onChange={(e) => setUserConfirmedPassword(e.target.value)}
        />

        <FormControl fullWidth margin="normal">
          <Button type="submit" variant="contained" color="primary" onClick={handleChangePassword}>
              Zmień hasło
          </Button>
        </FormControl>
        
        <Divider sx={{ mb: 2 }} />

        <Typography variant="h5" gutterBottom>
          Usuwanie konta
        </Typography>
        <FormControl fullWidth margin="normal">
          <Button
            type="button"
            variant="contained"
            color="error"
            onClick={() => setDeleteModalOpen(true)} // Otwórz modal
          >
            Usuń konto
          </Button>
        </FormControl>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbarStatus}
        autoHideDuration={6000}
        onClose={() => changeSnackbarStatus(false)}
      >
        <Alert
          onClose={() => changeSnackbarStatus(false)}
          severity={snackbarType}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarInfo}
        </Alert>
      </Snackbar>

      {/* Modal potwierdzenia */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <DialogTitle>Potwierdzenie usunięcia konta</DialogTitle>
        <DialogContent>
          <Typography>Czy na pewno chcesz usunąć swoje konto? Tego działania nie można cofnąć.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModalOpen(false)} color="primary">
            Anuluj
          </Button>
          <Button onClick={handleDeleteAccount} color="error">
            Usuń
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserProfile;