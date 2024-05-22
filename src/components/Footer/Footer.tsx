import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{ bgcolor: 'primary.dark', p: 3, mt: 'auto' }}>
            <Typography variant="body2" color="textSecondary" align="center">
                © {new Date().getFullYear()} Boonkie. All rights reserved.
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
                <Link color="inherit" href="/about-us">About Us</Link> |
                <Link color="inherit" href="/legal-notice">Legal Notice</Link>
            </Typography>
        </Box>
    );
};

export default Footer;
