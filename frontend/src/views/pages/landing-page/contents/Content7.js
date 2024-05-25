import React from 'react'
import {Grid, Container, Typography, Box, Button} from '@mui/material';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import bgImg from 'assets/images/LandingPage/Content7/bg-img.PNG';
import leftImg from 'assets/images/LandingPage/Content7/left-img.png';

const Content7 = ()=>(
    <>
        <Box sx={{backgroundImage: `url(${bgImg})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', width: '100%', height: '500px', mt: 10}}>
            <Container>
                <Grid container>
                    <Grid sm={5} xs={12} sx={{mt: {sm:10}, pl: 5}} >
                        <img src={leftImg} alt='leftImg' style={{width: '100%', height: 'auto'}}/>
                    </Grid>
                    <Grid sm={1}/>
                    <Grid sm={5} xs={12} sx={{mt: 10}}>
                        <Typography  color='#000000' style={{fontSize: {lg: 48, md: 30}, fontWeight: 'bold'}}>
                            <spna style={{color: '#008BFF'}}>High-Quality </spna>Video Chat on Our Platform
                        </Typography>
                        <hr style={{backgroundColor: '#1967D2', border: '1px solid #1967D2', width: '25%', marginLeft: 0}}/>
                        <Typography sx={{color: '#000000', fontSize: {lg: 24, md: 18}, mt: 3}}>
                            Experience crystal-clear, high-definition video chat
                            that brings you closer than ever before. Say goodbye
                            to pixelation and buffering, and say hello to the future
                            of video communication
                        </Typography>

                        <Button variant="contained" sx={{backgroundColor: '#1967D2', color: '#FFFFFF', mt: 4}} endIcon={<ChevronRightIcon />}>
                            Get Started
                        </Button>
                    </Grid>          
                </Grid>
            </Container>
            
        </Box>
    </>
) 

export default Content7