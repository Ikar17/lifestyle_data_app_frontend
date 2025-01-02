import React from 'react';
import { Card, CardContent, Typography, Grid, Box, Chip, Divider } from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Funkcja formatowania daty
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

// Funkcja zwracająca kolor na podstawie indeksu powietrza
const getAirQualityColor = (index) => {
  switch (index) {
    case 1: return 'success';
    case 2: return 'warning';
    case 3: return 'error';
    default: return 'default';
  }
};

// Główny komponent
const AirQualityCard = ({ data }) => {
    if(data === null) return;
    const { airIndex, comunne, createdAt, pm10, pm2_5, o3, no2, so2, co, nh3 } = data;

  return (
    <Card
      sx={{
        margin: '20px auto',
        boxShadow: 4,
        borderRadius: 3,
        p: 2,
      }}
    >
      <CardContent>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={2} display="flex" justifyContent="center">
            <AirIcon sx={{ fontSize: 60, color: 'primary.main' }} />
          </Grid>

          <Grid item xs={12} sm={7}>
            <Typography variant="h5" sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
              gmina {comunne.name}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'left' }, gap: 1, mt: 1 }}>
              <LocationOnIcon fontSize="small" />
              <Typography variant="body2">
                {comunne.lan.toFixed(2)}, {comunne.lon.toFixed(2)}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={3} display="flex" justifyContent="center">
            <Chip
              label={`Index: ${airIndex}`}
              color={getAirQualityColor(airIndex)}
              sx={{ fontSize: 16, py: 1.5 }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="subtitle1" sx={{ mb: 2, textAlign: 'center' }}>
          Parametry jakości powietrza
        </Typography>

        <Grid container spacing={2}>
          {[
            { label: 'PM10', value: pm10 },
            { label: 'PM2.5', value: pm2_5 },
            { label: 'O3', value: o3 },
            { label: 'NO2', value: no2 },
            { label: 'SO2', value: so2 },
            { label: 'CO', value: co },
            { label: 'NH3', value: nh3 },
          ].map((item, index) => (
            <Grid
              item
              xs={12}
              sm={4}
              key={index}
              sx={{ textAlign: 'center' }}
            >
              <Typography variant="body2">
                {item.label}: <strong>{item.value}</strong> µg/m³
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
          <AccessTimeIcon fontSize="small" />
          <Typography variant="body2" color="text.secondary">
            {formatDate(createdAt)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AirQualityCard;
