import { Alert, Container, Snackbar, CircularProgress, Paper, Box, Typography } from "@mui/material";
import FilterForm from "./FilterFrom";
import { useState } from "react";
import { getAirStatistics } from "../../api/air";
import AirQualityChart from "./AirQualityChart";
import dayjs from 'dayjs';

const AirStatisticsPage = () => {

    const [data, setData] = useState([]);
    const [dates, setDates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [snackbarStatus, changeSnackbarStatus] = useState(false);

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

    return (
        <Container sx={{ marginTop: 4 }}>
            <Paper elevation={3} sx={{ padding: 4, marginBottom: 4 }}>
                <Typography variant="h4" sx={{ marginBottom: 3, textAlign: 'center' }}>
                    Statystyki jakości powietrza
                </Typography>

                <FilterForm onFilterChange={handleFilterChange} />

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    data.length > 0 ? (
                        data.map((item, index) => (
                            <AirQualityChart
                                key={item.parameter}
                                dates={dates}
                                data={item.data}
                                title={item.parameter}
                                color_number={index}
                            />
                        ))
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