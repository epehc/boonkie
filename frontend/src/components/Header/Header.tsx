import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import Logo from '../../assets/logo.png';

const Header = () => {
    return (
        <AppBar position="static" color="primary">
            <Toolbar>
                <img src={Logo} alt="Logo" style={{height: 40, marginRight: 10}}/>

            </Toolbar>
        </AppBar>
    );
};

export default Header;
