import React from "react";
import { pawBook } from "../../domain/pawBook";
import Grid from "@mui/material/Unstable_Grid2";
import { Button, Divider, Stack, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';

const BookPage = () => {
    const theme = useTheme(); // Access the theme to use its values directly in style props if needed

    return (
        <Grid container spacing={2} style={{ backgroundColor: theme.palette.background.default }}>
            <Grid xs={1} />
            <Grid xs={4}>
                <img src={pawBook.cover} alt={pawBook.title} style={{ maxWidth: '100%', height: 'auto' }}/>
            </Grid>
            <Grid xs={6}>
                <Stack spacing={2}>
                    <Typography variant="h4" color="textPrimary">{pawBook.title}</Typography>
                    <Typography variant="h6" color="textSecondary">{pawBook.subtitle}</Typography>
                    <Typography variant="subtitle1" style={{ color: theme.palette.secondary.dark }}>by {pawBook.author}</Typography>
                    <Divider />
                    <Typography variant="body1">{pawBook.publisher}</Typography>
                    <Typography variant="body2">ISBN: {pawBook.isbn}</Typography>
                    <Typography variant="body2">{pawBook.numPages} pages</Typography>
                    <Typography variant="h5" color="primary">Price: {pawBook.price}</Typography>
                    <Button variant="contained" color="primary">
                        Add to Cart
                    </Button>
                    <Button variant="outlined" color="secondary">
                        Add to Wishlist
                    </Button>
                    <Divider />
                    <Typography variant="subtitle1">About this book</Typography>
                    <Typography variant="body1">{pawBook.abstract}</Typography>
                </Stack>
            </Grid>
            <Grid xs={1} />
        </Grid>
    );
};

export default BookPage;
