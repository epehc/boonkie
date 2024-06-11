import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {Alert, Box, Button, Collapse, Divider, IconButton, Stack, Typography} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Book from "../domain/Book";
import {useNavigate, useParams} from "react-router-dom";
import {pawBook} from "../domain/pawBook";
import {getBook, updateBook} from "../domain/API";
import AltCover from "../assets/noLogo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import {useSelector} from "react-redux";
import {RootState} from "../state/store";

const BookPage = () => {
    const theme = useTheme();
    const [book, setBook] = useState<Book>(pawBook);
    const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
    const [cartButtonDisabled, setCartButtonDisabled] = useState<boolean>(false);

    const isAdmin = useSelector((state: RootState) => state.login.isAdmin)

    const navigate = useNavigate();
    const { id } = useParams() as { id: string }

    const handleCloseAlert = () => {
        setUpdateSuccess(false)

    }

    const fetchBook = async () => {
        try {
            const fetchedBook = await getBook(id);
            setBook(fetchedBook);
        } catch (e) {
            console.error('Failed to fetch book:', e);
        }

    }

    const handleAddBookToCart = () => {
        book.userId = 2
        updateBook(book)
        setUpdateSuccess(true)
        setCartButtonDisabled(true)
    }

    const handleNavigateToCart = () => {
        navigate('/cart')

    }

    useEffect(() => {
        fetchBook().then(() => console.log("Book fetched"))
    }, [])

    return (
        <Box sx={{display: 'flex', justifyContent: 'center', height: '60vh', marginTop:'10vh', marginBottom: '10vh'}}>
            <Box sx={{display: 'flex', justifyContent: 'center',  width: '70%'}}>
                <Grid container spacing={15} style={{ marginTop: '20px', marginBottom: '20px', backgroundColor: theme.palette.background.paper, borderRadius: '1.5rem' }}>
                    <Grid xs={4}>
                        <Button sx= {{width: '100%', marginBottom: '20px'}} variant="text" color="primary" onClick={() => navigate('/books')}><u>Back to Books</u></Button>
                        {book.cover === "" ? <img src={AltCover} alt="No Cover" style={{ maxWidth: '100%', height: 'auto', marginTop:'20px' }}/> : <img src={book.cover} alt="Cover" style={{ width: '100%', height: 'auto' }}/>}
                    </Grid>
                    <Grid xs={8}>
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
                            {!isAdmin &&
                                <Button disabled={cartButtonDisabled} variant="contained" color="primary" startIcon={<ShoppingCartIcon/>} onClick={handleAddBookToCart}>Add to Cart</Button>
                            }
                            <Collapse in={updateSuccess}>
                                <Alert severity="success" variant="filled"  onClose={handleCloseAlert} action={
                                    <>
                                        <Button color="inherit" size="small" onClick={handleNavigateToCart}>
                                            <u>Go to cart</u>
                                        </Button>
                                        <IconButton
                                            aria-label="close"
                                            color="inherit"
                                            size="small"
                                            onClick={handleCloseAlert}
                                        >
                                            <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    </>
                                }>
                                    Book was added to cart
                                </Alert>
                            </Collapse>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </Box>

    );
};

export default BookPage;
