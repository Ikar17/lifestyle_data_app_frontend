import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useEffect, useState } from "react";

const Chart = ({ data }) => {

    const [xAsis, setXAsis] = useState([]);
    const [series, setSeries] = useState([]);

    useEffect(() => {
        if(data){
            const labels = data.map((item) => item.answer);
            console.log(labels);
            setXAsis(labels);
            const counts = data.map((item) => parseInt(item.count, 10));
            console.log(counts);
            setSeries(counts);
        }
    },[])

    return(
        <Box>
            <BarChart 
                xAxis={[{ 
                    scaleType: 'band', 
                    data: xAsis,
                    colorMap: {
                        type: 'ordinal',
                        colors: ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51']
                    }
                }]}
                series={[{ data: series}]}
                height={300}
            />
        </Box>
    )
}

export default Chart;