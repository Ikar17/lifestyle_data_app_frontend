import React, { useEffect } from 'react';
import { Container, Grid, Box, Typography} from '@mui/material';
import image from "../../assets/homepageimage.jpg";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function WelcomePage(){
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        if(auth.token !== "") navigate("/dashboard");
    }, [])

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}> 
                    <Box
                        component="div"
                        sx={{
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '400px',
                            borderRadius: 2,
                            opacity: 0.6,
                            boxShadow: 3
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}> 
                    <Typography variant="h4" component="h2" gutterBottom>
                        O aplikacji
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                        Aplikacja jest systemem ankietyzacji która pozwala zbierać dane na temat użytkowników. 
                        Dodatkowo zbiera dane o jakości powietrza w regionie życia użytkowników.
                        Jako ankieter twórz i rozsyłaj ankiety do grupy osób, a następnie dzięki zebranym danym wysuwaj wnioski.
                        Jako użytkownik wypełniaj ankiety i zbieraj dane na temat siebie i otaczającego środowiska.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}