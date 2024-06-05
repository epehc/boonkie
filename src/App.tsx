import React, {useEffect, useState} from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {CssBaseline} from '@mui/material';
import BookListPage from "./pages/BookListPage";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import {useBooks} from "./domain/hooks";
import {Route, BrowserRouter as Router, Routes, Navigate} from "react-router-dom";
import BookPage from "./pages/BookPage";
import CreateBookPage from "./pages/CreateBookPage";
import LoginPage from "./pages/LoginPage";
import EditBookModal2 from "./components/BookListPageRow/EditBookModal2";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";

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
    const {books, page, setPage,
        state, setState, error,
        setError, refresh} = useBooks();

    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true)
    }


    const handleLogOut = () => {
        setLoggedIn(false)
    }


    useEffect(() => {
        const intervalId = setInterval(() => {
            refresh();
        }, 60000);

        return () => clearInterval(intervalId);
    }, [refresh, page])


    return(

        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router >
                <Header loggedIn={loggedIn} onLogOut={handleLogOut}/>
                <Routes>
                    <Route path="/" element={<Navigate to={"/books"}/>}/>
                    <Route path="/books" element={
                        state === 'loading' ? <p>Loading books...</p> :
                        state === 'error' ?  <p>Error: {error?.message}</p>:
                        state === 'success' && <BookListPage books={books} loggedIn={loggedIn} page={page} setPage={setPage} refresh={refresh}/>

                    }>
                        <Route path="/books/:id/edit" element={<EditBookModal2 refresh={refresh}/>}/>
                    </Route>
                    <Route path="/books/:id" element={<BookPage/>}/>
                    <Route path="/new" element={<CreateBookPage refresh={refresh}/>}/>
                    <Route path="/login" element={<LoginPage onLogin={handleLogin} refresh={refresh}/>}/>
                    <Route path="/register" element={<RegisterPage onRegister={handleLogin} refresh={refresh}/>}/>
                    <Route path="/about" element={<AboutPage/>}/>
                </Routes>
                <Footer/>
            </Router>
        </ThemeProvider>
    )

};

export default App;
