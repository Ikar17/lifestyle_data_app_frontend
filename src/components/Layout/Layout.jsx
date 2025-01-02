import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Footer from "../Footer/Footer";

export default function Layout() {
    return (
        <Box 
            sx={{
                background: 'linear-gradient(to right, #e0f7fa, #b2ebf2)',
                minHeight: "100vh",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
        >
            <Navbar />
            <Outlet />
            <Footer />
        </Box>
    )
}