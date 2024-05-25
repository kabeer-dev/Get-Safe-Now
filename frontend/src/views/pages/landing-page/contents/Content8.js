import React from 'react';
import {Grid, Container, Typography, Box} from '@mui/material';

import bgColor from 'assets/images/LandingPage/Content8/bg-color.png';


const Content8 = ()=>(
    <>
        <Box>
            <Box sx={{backgroundImage: `url(${bgColor})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', width: '100%', height: '400px', mt: 10}}>
                <Container>
                    <Grid container sx={{mt: 10}}>
                        <Grid xs={12} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
                            <Typography  color='#FFFFFF' sx={{fontSize: {md:'48px', xs:'26px'}, fontWeight: 'bold'}}>
                                What People are Saying
                            </Typography>
                            <hr style={{backgroundColor: '#FFFFFF', border: '1px solid #FFFFFF', width: '10%'}}/>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    </>
)

export default Content8