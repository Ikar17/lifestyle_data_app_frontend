import { Box, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import React from 'react';

const AirQualityChart = ({ dates, data, title }) => {


  return (
    <Box sx={{marginTop: '20px'}}>
        <Typography>Parametr: {title}</Typography>
        <LineChart
            xAxis={[{ scaleType: 'point', data: dates }]}
            series={[
                {
                    data: data,
                    area: true
                },
            ]}
            height={300}
        />
    </Box>

  );
};

export default AirQualityChart;