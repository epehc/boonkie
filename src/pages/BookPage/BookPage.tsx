import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {Box, Button, Divider, Stack, Typography} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Book from "../../domain/Book";
import {useNavigate, useParams} from "react-router-dom";
import {pawBook} from "../../domain/pawBook";
import {getBook} from "../../domain/API";
import AltCover from "../../assets/noLogo.png";

const BookPage = () => {
    const theme = useTheme(); // Access the theme to use its values directly in style props if needed
    const [book, setBook] = useState<Book>(pawBook); // [1
    const navigate = useNavigate();
    const { id } = useParams() as { id: string };

    const fetchBook = async () => {
        try {
            const fetchedBook = await getBook(id);
            setBook(fetchedBook);
        } catch (e) {
            console.error('Failed to fetch book:', e);
        }

    }

    useEffect(() => {
        fetchBook()
    }, [])

    return (
        <Grid container spacing={2} style={{ marginTop: '20px', backgroundColor: theme.palette.background.default }}>
            <Grid xs={2} />
            <Grid xs={3}>
                <Stack spacing={2}>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <Button sx= {{width: '80%'}} variant="text" color="primary" onClick={() => navigate('/')}>Back to Books</Button>
                    </Box>
                    {book.cover === "" ? <img src={AltCover} alt="No Cover" style={{ maxWidth: '100%', height: 'auto' }}/> : <img src={book.cover} alt="Cover" style={{ maxWidth: '100%', height: 'auto' }}/>}

                </Stack>
            </Grid>
            <Grid xs={5}>
                <Stack spacing={2}>
                    <Typography variant="h4" color="textPrimary">{book.title}</Typography>
                    <Typography variant="h6" color="textSecondary">{book.subtitle}</Typography>
                    <Typography variant="subtitle1" style={{ color: theme.palette.secondary.dark }}>by {book.author}</Typography>
                    <Divider />
                    <Typography variant="body1">{book.publisher}</Typography>
                    <Typography variant="body2">ISBN: {book.isbn}</Typography>
                    <Typography variant="body2">{book.numPages} pages</Typography>
                    <Typography variant="h5" color="primary">Price: {book.price}</Typography>
                    <Divider />
                    <Typography variant="subtitle1">About this book:</Typography>
                    <Typography variant="body1" sx={{marginBottom: '20px'}}>{book.abstract}</Typography>
                </Stack>
            </Grid>
            <Grid xs={2} />
        </Grid>
    );
};

export default BookPage;
