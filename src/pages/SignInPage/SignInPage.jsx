import { Alert, Box, Button, Container, Snackbar, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function SignInPage(){
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        if(auth.token !== "") navigate("/dashboard");
    }, []);

    const [snackbarStatus, changeSnackbarStatus] = useState(false);

    const closeSnackbar = () => {
        changeSnackbarStatus(false);
    }

    const handleSubmit = async (event) => {
      try {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        
        const result = await auth.login(email,password);
        if(result) navigate("/dashboard"); 
        else changeSnackbarStatus(true);
      }catch (error) {
        console.log(error);
        changeSnackbarStatus(true);
      }
    }
  
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
                  Logowanie
              </Typography>
              <Box component="form" onSubmit={ handleSubmit }>
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Adres email"
                      name="email"
                      autoComplete="email"
                      autoFocus
                  />
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="password"
                      label="Hasło"
                      name="password"
                      autoComplete="password"
                      type="password"
                  />
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                  >
                      Zaloguj się
                  </Button>
              </Box>
              <Link to="/register" variant="body2">
                  Nie masz konta? Zarejestruj się
              </Link>
          </Box>
          <Snackbar
              open={ snackbarStatus }
              autoHideDuration={ 6000 }
              onClose={ closeSnackbar }
          >
              <Alert
                  onClose={ closeSnackbar }
                  severity="error"
                  variant="filled"
                  sx={{ width: '100%' }}
              >
                  Niepoprawny email lub hasło
              </Alert>
          </Snackbar>
      </Container>  
  )
}
