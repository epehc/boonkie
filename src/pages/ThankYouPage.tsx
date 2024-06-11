import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {Box, Typography} from "@mui/material";

const ThankYouPage = () => {
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(15);


    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/books');
        }, 15000);

        // Update time left every second
        const interval = setInterval(() => {
            setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        }, 1000);

        // Cleanup function to clear the timer if the component unmounts before the timer finishes
        return () => {
            clearTimeout(timer)
            clearInterval(interval);
        };
    }, [navigate]);
    return (
        <Box sx={{display: "flex", justifyContent:"center", marginTop: "10vh", marginBottom:"10vh"}}>
            <Box sx={{width: "60%", bgcolor: 'background.paper', borderRadius: '1.5rem', padding: '30px'}}>
                <Typography variant="h4" align="center" sx={{marginBottom: '20px'}}>Thank you for your purchase!</Typography>
                <Typography variant="body1" align="center" sx={{marginBottom: '20px'}}>You will be redirected to the home page in {timeLeft} seconds.</Typography>
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <NavLink to="/books" style={{textDecoration: "none"}}>Click here to go back to the home page </NavLink>
                </Box>
            </Box>
        </Box>
    )
}
export default ThankYouPage