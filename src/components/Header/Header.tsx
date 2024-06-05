import React from 'react';
import {AppBar, Toolbar, Button, ButtonGroup} from '@mui/material';
import Logo from '../../assets/logo.png';
import {useNavigate} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';

interface HeaderProps {
    loggedIn: boolean
    onLogOut: () => void
}

const Header: React.FC<HeaderProps> = ({loggedIn, onLogOut}) => {
    const theme = useTheme()
    const navigate = useNavigate();

    const handleNavigateHome = () => {
        navigate('/books');
    }

    const handleNavigateLoginScreen = () => {
        navigate('/login');
    }

    const handleLogout = () => {
        onLogOut()
        navigate('/books');
    }


    return (
        <AppBar position="sticky" sx={{bgColor: theme.palette.primary.main}}>
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                <img onClick={handleNavigateHome} src={Logo} alt="Logo" style={{height: 40, marginRight: 10}}/>
                <ButtonGroup sx={{position: "flex-end"}}>
                    {
                        loggedIn ?
                            <Button variant="text" sx={{color: theme.palette.text.primary}}
                                    onClick={handleLogout} startIcon={<NoAccountsIcon/>}>
                                LOG OUT
                            </Button>
                            :
                            <Button variant="text" sx={{color: theme.palette.text.primary}}
                                    onClick={handleNavigateLoginScreen} startIcon={<AccountCircleIcon/>}>
                                LOG IN
                            </Button>
                    }
                </ButtonGroup>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
