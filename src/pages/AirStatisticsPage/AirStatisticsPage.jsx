import { Alert, Container, Snackbar } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import FilterForm from "./FilterFrom";
import { useState } from "react";
import { getAirStatistics } from "../../api/air";
import AirQualityChart from "./AirQualityChart";
import dayjs from 'dayjs';

const AirStatisticsPage = () => {

    const [data, setData] = useState([]);
    const [dates, setDates] = useState([])
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

        try{
            const result = await getAirStatistics(
                newFilters.voivodeship,
                newFilters.district,
                newFilters.comunne,
                newFilters.startDate,
                newFilters.endDate
             )
             processData(result);
        }catch(error){
            console.log(error);
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

    return(
        <Container sx={{ marginTop: 4 }}>

            <FilterForm onFilterChange={handleFilterChange} />

            {data.map((item) => {
                return(
                    <AirQualityChart dates={dates} data={item.data} title={item.parameter}/>
                )
            })}

            <Snackbar
                open={ snackbarStatus }
                autoHideDuration={ 6000 }
                onClose={ closeSnackbar }
            >
                <Alert
                    onClose={ closeSnackbar }
                    severity='error'
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Niepoprawne daty
                </Alert>
            </Snackbar>

        </Container>
    )
}

export default AirStatisticsPage;