import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {CssBaseline} from '@mui/material';
import BookListPage from "./pages/BookListPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {Route, BrowserRouter as Router, Routes, Navigate} from "react-router-dom";
import BookPage from "./pages/BookPage";
import CreateBookPage from "./pages/CreateBookPage";
import LoginPage from "./pages/LoginPage";
import EditBookModal2 from "./components/BookListPageRow/EditBookModal2";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import ThankYouPage from "./pages/ThankYouPage";

// Define the custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#0ba6cf',  // scooter-500
            light: '#25c2e9', // scooter-400
        },
        secondary: {
            main: '#0c84ae',  // scooter-600
            light: '#ecfdff', // scooter-300
            dark: '#116a8d',  // scooter-700
        },
        background: {
            default: '#ecfdff',  // scooter-50
            paper: '#d0f6fd',    // scooter-100
        },
        text: {
            primary: '#175773',  // scooter-800
            secondary: '#87caed', // scooter-900
        },
    },
});


const App = () => {

    return(
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Router >
                    <Header/>
                    <Routes>
                        <Route path="/" element={<Navigate to={"/login"}/>}/>
                        <Route path="/books" element={<BookListPage/>}>
                            <Route path="/books/:id/edit" element={<EditBookModal2/>}/>
                        </Route>
                        <Route path="/books/:id/*" element={<BookPage/>}>
                            <Route path="edit-book" element={<EditBookModal2/>}/>
                        </Route>
                        <Route path="/new" element={<CreateBookPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/about" element={<AboutPage/>}/>
                        <Route path="/cart" element={<CartPage/>}/>
                        <Route path="/thank-you" element={<ThankYouPage/>}/>
                    </Routes>
                    <Footer/>
                </Router>
            </ThemeProvider>

    )

};

export default App;
