import React from "react";
import {pawBook} from "../../domain/pawBook";
import Grid from "@mui/material/Unstable_Grid2";
import {Divider, Stack, Typography} from "@mui/material";

const BookPage = () => {
    return (
        <Grid container spacing={2}>
            <Grid xs={2}/>
            <Grid xs={4}>
                <img src={pawBook.cover} alt={pawBook.title}/>
            </Grid>
            <Grid xs={4}>
                <Stack>
                    <Typography variant="h2">{pawBook.title}</Typography>
                    <Typography variant="h5">{pawBook.subtitle}</Typography>
                    <Typography variant="subtitle1">{pawBook.author}</Typography>
                </Stack>
                <Divider/>
                <Stack>
                    <Typography variant="h5">{pawBook.price}</Typography>
                    <Typography variant="h5">{pawBook.abstract}</Typography>
                </Stack>
                {/*<h1>{pawBook.title}</h1>
                <h2>{pawBook.subtitle}</h2>
                <p>{pawBook.abstract}</p>
                <p>Author: {pawBook.author}</p>
                <p>Publisher: {pawBook.publisher}</p>
                <p>ISBN: {pawBook.isbn}</p>
                <p>Pages: {pawBook.numPages}</p>
                <p>Price: {pawBook.price}</p>*/}
            </Grid>
            <Grid xs={2}/>
        </Grid>
    )
}

export default BookPage;