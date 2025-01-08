import { Alert, Container, Snackbar, CircularProgress, Paper, Box, Typography, Button } from "@mui/material";
import FilterForm from "./FilterFrom";
import { useState } from "react";
import { downloadAirCSVFile, getAirStatistics } from "../../api/air";
import AirQualityChart from "./AirQualityChart";
import dayjs from 'dayjs';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AirIcon from '@mui/icons-material/Air';

const AirStatisticsPage = () => {

    const [data, setData] = useState([]);
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [snackbarStatus, changeSnackbarStatus] = useState(false);
    const [filters, setFilters] = useState({});

    const handleFilterChange = async (newFilters) => {
        //walidacja
        if(newFilters.startDate !== '' && newFilters.endDate !== ''){
            const date1 = dayjs(newFilters.startDate);
            const date2 = dayjs(newFilters.endDate);
            if (date2.isBefore(date1)){
                changeSnackbarStatus(true);
                return;
            }
        }

        if(newFilters.startDate == "Invalid Date" || newFilters.endDate == "Invalid Date"){
            changeSnackbarStatus(true);
            return;
        }

        try {
            setLoading(true);
            const result = await getAirStatistics(
                newFilters.voivodeship,
                newFilters.district,
                newFilters.comunne,
                newFilters.startDate,
                newFilters.endDate
            );
            processData(result);
            setFilters(newFilters);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
        
    };

    const processData = (data) => {
        const datesTemp = data.map(item => {
            const date = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm');
            return date;
        });

        setDates(datesTemp);

        const parameters = ["airIndex", "co", "nh3", "no", "no2", "o3", "pm10", "pm2_5", "so2"];

        const results = parameters.map( parameter => {
            const parameterData = data.map(item => {
                return parseFloat(item[parameter].toFixed(3));
            })

            const parameterObject = {
                parameter: parameter,
                data: parameterData
            }
            return parameterObject;
        })
        setData(results);
    }

    const closeSnackbar = () => {
        changeSnackbarStatus(false);
    }

    const getCSVFile = async() => {
        try{
            await downloadAirCSVFile(
                filters.voivodeship,
                filters.district,
                filters.comunne,
                filters.startDate,
                filters.endDate
            )
        }catch(error){

        }
    }

    const LoadingFragment = () => {
        return(
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                <CircularProgress />
            </Box>
        ) 
    }

    const CharsFragment = () => {
        return(
            <>
            {data.map((item, index) => (
                <AirQualityChart
                    key={item.parameter}
                    dates={dates}
                    data={item.data}
                    title={item.parameter}
                    color_number={index}
                />
            ))}

            {/* Przycisk pobierania CSV */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <Button 
                    onClick={getCSVFile} 
                    variant="contained" 
                    color="secondary"
                    size="large"
                    startIcon={<FileDownloadIcon />}
                    sx={{ textTransform: 'none', borderRadius: 3, boxShadow: 4 }}
                >
                    Pobierz pomiary (CSV)
                </Button>
            </Box>
            <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
                Wskazówka: Aby poprawnie używać danych w Excelu, zaimportuj plik CSV. Separatorem jest średnik (;).
            </Typography>
            </>
        )
    }

    return (
        <Container sx={{ marginTop: 4 }}>
            <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
                <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>
                    Statystyki jakości powietrza
                </Typography>

                <FilterForm onFilterChange={handleFilterChange} />
                <Typography variant='body1' sx={{ display: 'block'}}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle' }}>
                            <AirIcon sx={{ marginRight: 0.5 }} /> 
                        </span>
                        <strong>Legenda:</strong> airIndex - indeks powietrza (1 - dobry, 5 - słaby), co - tlenek węgla, nh3 - amoniak, no - tlenek azotu, no2 - dwutlenek azotu, 
                        o3 - ozon, so2 - dwutlenek siarki, pm2_5 i pm10 - pyły zawieszone
                </Typography>

                {loading ? (
                    <LoadingFragment />
                ) : (
                    data.length > 0 ? (
                        <CharsFragment />
                    ) : (
                        <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 4 }}>
                            Brak danych do wyświetlenia
                        </Typography>
                    )
                )}

                <Snackbar
                    open={snackbarStatus}
                    autoHideDuration={6000}
                    onClose={closeSnackbar}
                >
                    <Alert
                        onClose={closeSnackbar}
                        severity='error'
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        Niepoprawne daty
                    </Alert>
                </Snackbar>
            </Paper>
        </Container>
    );
};

export default AirStatisticsPage;