import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Container, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import signup from "../../api/signup";
import { useAuth } from "../../contexts/AuthContext";
import { getComunnes, getDistricts, getVoivodeships } from "../../api/address";

export default function SignUpPage(){
  const navigate = useNavigate();
  const auth = useAuth();

  const [snackbarStatus, changeSnackbarStatus] = useState(false);
  const [voivodeships, setVoivodeships] = useState([""]); 
  const [districts, setDistricts] = useState([""]); 
  const [comunnes, setComunnes] = useState([""]); 

  useEffect(() => {
    if(auth.token !== "") navigate("/dashboard");
    fetchVoivodeships();
  }, [auth.token]);

  const closeSnackbar = () => {
      changeSnackbarStatus(false);
  }

  const fetchVoivodeships = async () => {
    const data = await getVoivodeships();
    setVoivodeships(data);
  };

  const fetchDistricts = async (event) => {
    const selectedValue = event.target.value;
    const data = await getDistricts(selectedValue);
    if(data != null) setDistricts(data);
    console.log(data);
  }

  const fetchComunnes = async (event) => {
    const selectedValue = event.target.value;
    const data = await getComunnes(selectedValue);
    if(data != null) setComunnes(data);
    console.log(data);
  }


  const handleSubmit = async (event) => {
    try {
      event.preventDefault();  
      const data = new FormData(event.currentTarget);
      const token = await signup(data);
      auth.injectToken(token);
    }catch (error) {
      console.log(error);
      changeSnackbarStatus(true);
    }
  };

  return(
    <Container 
        maxWidth="xs"
    >
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 12,
                minHeight: "70vh"
            }}
        >
            <Typography component="h1" variant="h4">
                Utwórz konto
            </Typography>
            <Box component="form" onSubmit={ handleSubmit }>
                <TextField
                    required
                    fullWidth
                    id="name"
                    label="Imię"
                    name="name"
                    autoComplete="given-name"
                    autoFocus
                    margin="normal"
                />
                <TextField
                    required
                    fullWidth
                    id="surname"
                    label="Nazwisko"
                    name="surname"
                    autoComplete="family-name"
                    margin="normal"
                />

                <TextField
                    fullWidth
                    id="birthDate"
                    label="Data urodzenia"
                    name="birthDate"
                    type="date"
                    InputLabelProps={{
                    shrink: true
                    }}
                    margin="normal"
                    required
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Adres email"
                    name="email"
                    autoComplete="email"
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Hasło"
                    name="password"
                    type="password"
                    autoComplete="password"
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password2"
                    label="Powtórz hasło"
                    name="password2"
                    type="password"
                    autoComplete="password"
                />

                <FormControl fullWidth margin="normal" required>
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

                <FormControl fullWidth margin="normal" required>
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

                <FormControl fullWidth margin="normal" required>
                    <InputLabel id="comunne-label">Gmina</InputLabel>
                    <Select
                    labelId="comunne-label"
                    id="comunne"
                    name="comunne"
                    label="Gmina"
                    >
                    {comunnes.map((comunne, index) => (
                        <MenuItem key={index} value={comunne.name}>{comunne.name}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
                
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Zarejestruj się
                </Button>
            </Box>
            <Link to="/login" variant="body2">
                Masz konto? Zaloguj się
            </Link>
        </Box>

        <Snackbar
            open={ snackbarStatus }
            autoHideDuration={ 6000 }
            onClose={ closeSnackbar }
        >
            <Alert
                onClose={ closeSnackbar }
                severity= "error"
                variant="filled"
                sx={{ width: '100%' }}
            >
                Błąd rejestracji. Spróbuj później lub innym mailem
            </Alert>
        </Snackbar>

    </Container>  
)

}
