import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import {useTheme} from "@mui/material/styles";
import {useNavigate} from "react-router-dom";

const Footer = () => {

    const theme = useTheme()

    const navigate = useNavigate()

    const handleNavigateToAbout = () => {
        navigate('/about');
    }
    return (
        <Box component="footer" sx={{marginTop: '20px', bgcolor: theme.palette.primary.dark, p: 3, mt: 'auto'}}>
            <Typography variant="body2" color="textSecondary" align="center">
                © {new Date().getFullYear()} Boonkie. All rights reserved.
            </Typography>
            <Typography variant="body2" color={theme.palette.text.secondary} align="center">
                <Link color="inherit" onClick={handleNavigateToAbout}>About Us</Link> |
                <Link color="inherit"> Legal Notice</Link>
            </Typography>
        </Box>
    );
};

export default Footer;
