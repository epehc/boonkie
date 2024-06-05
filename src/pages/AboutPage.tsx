import React from "react"
import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const AboutPage = () => {

    const navigate = useNavigate()

    return(
        <Box sx={{marginLeft: '50px', marginTop: '20px'}}>
            <Box>
                <Button  variant="text" color="primary" onClick={() => navigate('/')}>Back to Start</Button>
                <Typography variant="h2">Boonkie</Typography>
                <Typography variant='body1'>Boonkie was developed as a project for the Front-End Development course in the Summer Semester 2024 at HTW Berlin.</Typography>
                <Typography variant='body1'>By: Jose Cardona</Typography>
                <Typography sx={{marginBottom:'20px'}} variant='body1'>Matrikelnr. 577913</Typography>
            </Box>
        </Box>
    )
}

export default AboutPage