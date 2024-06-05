import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import {useTheme} from "@mui/material/styles";

const Footer = () => {

    const theme = useTheme()
    return (
        <Box component="footer" sx={{marginTop: '20px', bgcolor: theme.palette.primary.dark, p: 3, mt: 'auto' }}>
            <Typography variant="body2" color="textSecondary" align="center">
                © {new Date().getFullYear()} Boonkie. All rights reserved.
            </Typography>
            <Typography variant="body2" color={theme.palette.text.secondary} align="center">
                <Link color="inherit" href="/about-us">About Us</Link> |
                <Link color="inherit" href="/legal-notice"> Legal Notice</Link>
            </Typography>
        </Box>
    );
};

export default Footer;
