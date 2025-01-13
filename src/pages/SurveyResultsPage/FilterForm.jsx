import React, { useState, useEffect } from 'react';
import { MenuItem, Button, Box, InputLabel, Select, FormControl, Typography } from '@mui/material';
import { getComunnes, getDistricts, getVoivodeships } from '../../api/address';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const FilterForm = ({ onFilterChange }) => {

    const [voivodeships, setVoivodeships] = useState([]); 
    const [districts, setDistricts] = useState([]); 
    const [comunnes, setComunnes] = useState([]); 


    const [voivodeship, setVoivodeship] = useState('');
    const [district, setDistrict] = useState('');
    const [comunne, setComunne] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        fetchVoivodeships();
    }, []);

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

    const handleFilterChange = () => {
        onFilterChange({
            voivodeship: voivodeship,
            district: district,
            comunne: comunne,
            startDate: (startDate !== '' && startDate != null ) ? dayjs(startDate).format('YYYY-MM-DDTHH:mm') : '',
            endDate: (endDate !== '' && endDate != null) ? dayjs(endDate).format('YYYY-MM-DDTHH:mm') : '',
        });
    };

  return (
    <Box>
      <FormControl fullWidth margin="normal">
        <InputLabel id="voivodeship-label">Województwo</InputLabel>
            <Select
                labelId="voivodeship-label"
                id="voivodeship"
                name="voivodeship"
                label="Województwo"
                value={voivodeship || ''}
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
                    value={district || ''}
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
                    value={comunne || ''}
                    onChange={(e) => setComunne(e.target.value)}
                    >
                    {comunnes.map((comunne, index) => (
                        <MenuItem key={index} value={comunne.name}>{comunne.name}</MenuItem>
                    ))}
                </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
            <DateTimePicker
                label="Data rozpoczęcia"
                onChange={(newValue) => setStartDate(newValue)}
            />
        </FormControl>
       
        <FormControl fullWidth margin="normal">
            <DateTimePicker
                label="Data zakończenia"
                onChange={(newValue) => setEndDate(newValue)}
            />
        </FormControl>
      <Button variant="contained" color="primary" onClick={handleFilterChange}>Wyświetl</Button>
      <Typography variant='caption' sx={{display: "block", mb: 5}}>
        Wskazówka: Brak opcji filtrowania wyświetli wszystkie wyniki.
      </Typography>
    </Box>
  );
};

export default FilterForm;
