import React from 'react';
import {AppBar, Toolbar, Button, ButtonGroup} from '@mui/material';
import Logo from '../../assets/logo.png';
import {useNavigate} from "react-router-dom";
import {useTheme} from "@mui/material/styles";
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../state/store";
import {logout} from "../../state/login/loginSlice";



const Header = () => {
    const theme = useTheme()
    const navigate = useNavigate();

    const loggedIn = useSelector((state: RootState) => state.login.isLoggedIn)
    const isAdmin = useSelector((state: RootState) => state.login.isAdmin)
    const dispatch = useDispatch<AppDispatch>()

    const handleNavigateHome = () => {
        navigate('/books');
    }

    const handleNavigateCart = () => {
        navigate('/cart');
    }

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login');
    }


    return (
        <AppBar position="sticky" sx={{bgColor: theme.palette.primary.main}}>
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                <img onClick={handleNavigateHome} src={Logo} alt="Logo" style={{height: 40, marginRight: 10}}/>
                { loggedIn &&
                    <ButtonGroup sx={{position: "flex-end"}}>
                        {
                            !isAdmin ?
                                <>
                                    <Button variant="text" sx={{color: theme.palette.text.primary, marginRight: '20px'}}
                                            onClick={handleNavigateCart} startIcon={<ShoppingCartIcon/>}>
                                        CART
                                    </Button>
                                    <Button variant="text" sx={{color: theme.palette.text.primary}}
                                            onClick={handleLogout} startIcon={<NoAccountsIcon/>}>
                                        LOG OUT
                                    </Button>
                                </>
                                :
                                <Button variant="text" sx={{color: theme.palette.text.primary}}
                                        onClick={handleLogout} startIcon={<NoAccountsIcon/>}>
                                    LOG OUT
                                </Button>
                        }
                    </ButtonGroup>
                }
            </Toolbar>
        </AppBar>
    );
};

export default Header;
