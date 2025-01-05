import { Typography, Paper } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import React from 'react';
import { markElementClasses, areaElementClasses } from '@mui/x-charts/LineChart';

const AirQualityChart = ({ dates, data, title, color_number = 0 }) => {

  const colors = ["#2a9d8f", "#e9c46a", "#da627d", "#7209b7", "#bc3908", "#0d3b66", "#f72585", "#f3722c", "#e0aaff"]

  return (
    <Paper elevation={2} sx={{ marginTop: '20px', padding: '20px' }}>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Parametr: {title}
        </Typography>
        <LineChart
            xAxis={[{ scaleType: 'point', data: dates }]}
            series={[
                {
                    data: data,
                    area: true
                },
            ]}
            height={300}
            sx={{
              [`& .${areaElementClasses.root}`]: {
                fill: colors[color_number],
              },
              [`& .${markElementClasses.root}`]: {
                stroke: '#8884d8',
                scale: '0.6',
                fill: '#fff',
                strokeWidth: 2,
              },
            }}
        />
    </Paper>
);
};

export default AirQualityChart;