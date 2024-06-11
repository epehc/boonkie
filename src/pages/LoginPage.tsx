import React, {useState} from "react"
import {useNavigate} from "react-router-dom";
import {Alert, AlertTitle, Box, Button, ButtonGroup, Collapse, IconButton, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import CloseIcon from '@mui/icons-material/Close';
import {useDispatch} from "react-redux";
import {AppDispatch} from "../state/store";
import {signIn} from "../state/login/loginSlice";



const LoginPage = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errorDialogText, setErrorDialogText] = useState<string>("")
    const [errorDialogName, setErrorDialogName] = useState<string>("")

    const [error, setError] = useState<boolean>(false)

    const dispatch = useDispatch<AppDispatch>()

    const navigate = useNavigate()

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    };

    const handleError = (error: Error) => {
        setErrorDialogName("Invalid login credentials")
        setErrorDialogText(error.message)
        setError(true)
    }

    const handleSubmit = () => {
        dispatch(signIn({email, password}))
            .then(() => navigate('/books'))
            .catch((error) => {
                handleError(error)
            })
    }

    const handleCancel = () => {
        navigate('/books')
    }

    return (
        <>

            <Box sx={{display: "flex", justifyContent:"center", marginTop: "20vh", marginBottom:"41vh"}}>
                <Box sx={{width: "30%", bgcolor: 'background.paper', borderRadius: '1.5rem', padding: '30px'}}>
                    <Typography variant="h4"><b>Log In</b></Typography>
                    <TextField type="email" value={email} onChange={handleEmailChange} label="Email" sx={{marginTop: '20px', marginBottom: '20px'}} fullWidth/>
                    <TextField type="password" value={password} onChange={handlePasswordChange} label="Password" fullWidth/>
                    <ButtonGroup sx={{width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                        <Grid container spacing={2} sx={{width: "100%", justifyContent: 'center'}}>
                            <Grid xs={6} sx={{display: 'flex', justifyContent: 'flex-end' }}>
                                <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>Log in</Button>
                            </Grid>
                            <Grid xs={6}>
                                <Button onClick={handleCancel} variant="contained" color="secondary" sx={{marginLeft: "10px"}}>Cancel</Button>
                            </Grid>
                        </Grid>
                    </ButtonGroup>
                    <Collapse in={error}>
                        <Alert severity='error' sx={{marginTop:'20px', mb: 2, borderRadius: '1.25rem' }} action={
                            <IconButton aria-label="close" color="inherit" size="medium" onClick={() => {setError(false);}}>
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }>
                            <AlertTitle>{errorDialogName}</AlertTitle>
                            {errorDialogText}
                        </Alert>
                    </Collapse>
                </Box>
            </Box>

        </>

    )
}

export default LoginPage