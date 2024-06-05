import React from "react"
import {useForm} from "react-hook-form";
import User from "../../domain/User";
import {useNavigate} from "react-router-dom";
import {login} from "../../domain/API";
import {Box, Button, ButtonGroup, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

interface RegisterPageProps {
    onRegister: () => void;
    refresh: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({onRegister, refresh}) => {
    const { register, handleSubmit, formState: { errors } } = useForm<User>();

    const navigate = useNavigate()

    const onSubmit = (data: User) => {

        try{
            login(data).then( () => {
                onRegister()
                navigate("/books")
                refresh()
            }).catch( (error) => {
                console.error("Error logging in", error)
            })
        }catch (error){
            console.error("Error logging in", error)
        }
    }

    const handleCancel = () => {
        navigate('/books')
    }

    return (
        <Box sx={{display: "flex", justifyContent:"center", marginTop: "20px", marginBottom:"20px"}}>
            <Box sx={{width: "30%", bgcolor: 'background.paper', borderRadius: '1.5rem', padding: '30px'}}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Typography variant="h4">Register</Typography>
                    <TextField {...register("email", {required: true})} label="Email" sx={{marginTop: '20px', marginBottom: '20px'}} fullWidth/>
                    {errors.email && <p>This field is required</p>}
                    <TextField {...register("password", {required: true})} label="Password" fullWidth/>
                    {errors.password && <p>This field is required</p>}
                    <Typography variant="body2" sx={{marginLeft:'27%', marginTop: '20px', marginBottom: '20px'}}>Already have an account? <a href="/login">Log in</a></Typography>
                    <ButtonGroup sx={{width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                        <Grid container spacing={2} sx={{width: "100%", justifyContent: 'center'}}>
                            <Grid xs={6} sx={{display: 'flex', justifyContent: 'flex-end' }}>
                                <Button type="submit" variant="contained" color="primary">Register</Button>
                            </Grid>
                            <Grid xs={6}>
                                <Button onClick={handleCancel} variant="contained" color="secondary" sx={{marginLeft: "10px"}}>Cancel</Button>
                            </Grid>
                        </Grid>
                    </ButtonGroup>
                </form>
            </Box>
        </Box>
    )
}

export default RegisterPage