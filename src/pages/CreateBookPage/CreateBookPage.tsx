import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import {Button, TextField, Box, InputAdornment, ButtonGroup} from '@mui/material';
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import NewBook from "../../domain/NewBook";
import Book from "../../domain/Book";
import {createBook} from "../../domain/API";

interface CreateBookPageProps {
    refresh: () => void
}

const CreateBookPage: React.FC<CreateBookPageProps> = ({refresh}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<NewBook>();
    const [counter, setCounter] = useState(1)

    const navigate = useNavigate();

    const onSubmit = (data: NewBook) => {
        // Prepend the "$" symbol to the price value
        data.price = `$${data.price}`;

        const newBook: Book = {
            ...data,
            id: counter.toString(),
            isbn: counter.toString(),
            userId: 0
        }
        try{
            createBook(newBook).then( () => {
                console.log(newBook);
                setCounter(counter+1)
                navigate(`/books/${newBook.id}`)
                refresh();
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
        <Box sx={{display: "flex", justifyContent:"center", marginTop: "20px", marginBottom:"20px"}}>
            <Box sx={{width: "60%", bgcolor: 'background.paper', borderRadius: '1.5rem', padding: '30px'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} sx={{width: '100%', marginTop: '20px', marginBottom: '20px'}}>
                        <Grid xs={6}>
                            <TextField {...register("title", {required: true})} label="Title" fullWidth/>
                            {errors.title && <p>This field is required</p>}
                        </Grid>
                        <Grid xs={6}>
                            <TextField {...register("subtitle", {required: true})} label="Subtitle" fullWidth />
                            {errors.title && <p>This field is required</p>}
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{width: '100%', marginTop: '20px', marginBottom: '20px'}}>
                        <Grid xs={6}>
                            <TextField {...register("author", {required: true})} label="Author" fullWidth/>
                            {errors.author && <p>This field is required</p>}
                        </Grid>
                        <Grid xs={6}>
                            <TextField {...register("publisher", {required: true})} label="Publisher" fullWidth/>
                            {errors.publisher && <p>This field is required</p>}
                        </Grid>
                    </Grid>
                    <Grid container spacing={2} sx={{width: '100%', marginTop: '20px', marginBottom: '20px'}}>
                        <Grid xs={3}>
                            <TextField {...register("price", {required: true})} label="Price"
                                       fullWidth InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}/>
                            {errors.price && <p>This field is required</p>}
                        </Grid>
                        <Grid xs={3}>
                            <TextField {...register("numPages", {required: true, valueAsNumber: true})} label="Number of Pages"
                                       type="number" fullWidth/>
                            {errors.numPages && <p>This field is required</p>}
                        </Grid>
                        <Grid xs={6}>
                            <TextField {...register("cover")} label="Cover URL" fullWidth/>
                        </Grid>
                    </Grid>
                    <TextField {...register("abstract")} label="About" fullWidth multiline rows={3}/>
                    <ButtonGroup sx={{width: '15%', display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                        <Button type="submit" variant="contained" color="primary">Submit</Button>
                        <Button onClick={handleCancel} variant="contained" color="secondary" sx={{marginLeft: "10px"}}>Cancel</Button>
                    </ButtonGroup>
                </form>
            </Box>
        </Box>

    );
};

export default CreateBookPage;