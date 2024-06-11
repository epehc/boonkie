import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import {Button, TextField, Box, InputAdornment, ButtonGroup, Typography} from '@mui/material';
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import Book from "../domain/Book";
import {createBook} from "../domain/API";

const CreateBookPage = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<Book>();
    const [counter, setCounter] = useState(1)

    const navigate = useNavigate();
    const isbn = watch("isbn");

    const onSubmit = (data: Book) => {
        // Prepend the "$" symbol to the price value
        data.price = `$${data.price}`;

        const newBook: Book = {
            ...data,
            id: data.isbn,
            userId: 1
        }
        try{
            createBook(newBook).then( () => {
                console.log(newBook);
                setCounter(counter+1)
                navigate(`/books/${newBook.isbn}`)

            }).catch( (error) => {
                console.error("Error creating book", error)
            })
        }catch (e){
            console.error(e)
        }
    };

    const handleCancel = () => {
        navigate('/books');
    }

    return (
        <Box sx={{display: "flex", justifyContent:"center", marginTop: "10vh", marginBottom:"10vh"}}>
            <Box sx={{width: "60%", bgcolor: 'background.paper', borderRadius: '1.5rem', padding: '30px'}}>
                <Typography variant='h4' sx={{marginBottom: '20px'}}><b>Create a new book</b></Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} sx={{width: '100%', marginTop: '20px', marginBottom: '20px'}}>
                        <Grid xs={6}>
                            <TextField {...register("title", {required: true})} label="Title*" fullWidth/>
                            {errors.title && <Typography variant='body2' sx={{color:'red'}}>* This field is required</Typography>}
                        </Grid>
                        <Grid xs={6}>
                            <TextField {...register("subtitle")} label="Subtitle" fullWidth />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{width: '100%', marginTop: '20px', marginBottom: '20px'}}>
                        <Grid xs={6}>
                            <TextField {...register("author")} label="Author" fullWidth/>
                        </Grid>
                        <Grid xs={6}>
                            <TextField {...register("publisher")} label="Publisher" fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{width: '100%', marginTop: '20px', marginBottom: '20px'}}>
                        <Grid xs={6}>
                            <TextField {...register("isbn", {required: true})} label="ISBN*" fullWidth/>
                            {errors.title && <Typography variant='body2' sx={{color:'red'}}>* This field is required</Typography>}
                        </Grid>
                        <Grid xs={6}>
                            <TextField value={isbn} label="ID" fullWidth InputLabelProps={{ shrink: !!isbn }} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{width: '100%', marginTop: '20px', marginBottom: '20px'}}>
                        <Grid xs={3}>
                            <TextField {...register("price")} label="Price"
                                       fullWidth InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}/>
                        </Grid>
                        <Grid xs={3}>
                            <TextField {...register("numPages", {valueAsNumber: true})} label="Number of Pages"
                                       type="number" fullWidth/>
                        </Grid>
                        <Grid xs={6}>
                            <TextField {...register("cover")} label="Cover URL" fullWidth/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{width: '100%', marginTop: '20px', marginBottom: '20px'}}>
                        <Grid xs={12}>
                            <TextField {...register("abstract")} label="About" fullWidth multiline rows={3}/>
                        </Grid>
                    </Grid>
                    <Typography variant='body2' sx={{marginTop: '20px', color: 'primary'}}>
                        fields marked with * are required. ISBN and ID will be identical.
                    </Typography>
                    <ButtonGroup sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                        <Button type="submit" variant="contained" color="primary" sx={{marginRight: "40px"}}>Submit</Button>
                        <Button onClick={handleCancel} variant="contained" color="secondary" >Cancel</Button>
                    </ButtonGroup>
                </form>
            </Box>
        </Box>

    );
};

export default CreateBookPage;