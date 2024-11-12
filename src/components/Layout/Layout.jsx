import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Footer from "../Footer/Footer";

export default function Layout(){
    return (
        <Box 
            sx={{
                bgcolor: '#dad7cd',
                minHeight: "100vh",
            }}
        >
            <Navbar />
            <Outlet />
            <Footer />
        </Box>
    )
} 