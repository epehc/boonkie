import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import BookTable from "./components/BookTable/BookTable";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

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
            //variant: '#6adcf6', // scooter-300
            dark: '#116a8d',  // scooter-700
        },
        background: {
            default: '#ecfdff',  // scooter-50
            paper: '#d0f6fd',    // scooter-100
        },
        text: {
            primary: '#175773',  // scooter-800
            secondary: '#184861', // scooter-900
        },
    },
});


const App = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header/>
        <BookTable />
        <Footer/>
    </ThemeProvider>
);

export default App;
