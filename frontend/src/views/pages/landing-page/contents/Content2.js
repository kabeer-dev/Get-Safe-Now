import React from 'react';
import {Grid, Container, Typography, Box} from '@mui/material';
import hand1 from 'assets/images/LandingPage/hand1.png';
import boxes2 from 'assets/images/LandingPage/box2-img.png';
import shield3 from 'assets/images/LandingPage/shiled3-img.png';
import arrowIcon from 'assets/images/LandingPage/arrow-icon.png';

const Content2 = () => (
    <>
        <Container sx={{mt: 10}}>
            <Grid sx={{borderRadius: '10px', border: '2px solid #9CA6E5',}}>
                <Grid container sx={{backgroundColor: '#455ADF', margin: '5px', borderRadius: '5px'}}>
                    <Container sx={{display: {sm:'flex', xs:'block'}}}>
                        
                        <Grid item sm={3} xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 2 }}>
                            <Box>
                            <img src={hand1} alt='handImg' style={{ borderRadius: '50%', backgroundColor: '#FFFFFF',
                            padding: '5px 2px 2px 2px', boxSizing: 'content-box', width: '100%'}}/>
                            </Box>
                            <Typography sx={{fontSize: {lg:32, md:28}, color: '#FFFFFF', marginTop: 1}}>Easy to use</Typography>
                        </Grid>

                        <Grid  item  sm={1} xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: {xs:'center'}}}>
                            <Box>
                            <img src={arrowIcon} alt='arrow' style={{width: '100%'}}/>
                            </Box>
                        </Grid>

                        <Grid item sm={3} xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 2 }}>
                            <Box>
                            <img src={boxes2} alt='handImg' style={{borderRadius: '50%', backgroundColor: '#FFFFFF',
                            padding: '5px 5px 2px 5px', boxSizing: 'content-box', width: '100%'}}/>
                            </Box>
                            <Typography sx={{fontSize: {lg: 32, md: 18}, color: '#FFFFFF', marginTop: 1}}>All in one platform</Typography>
                        </Grid>

                        <Grid  item sm={1} xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: {xs:'center'}}}>
                            <Box>
                            <img src={arrowIcon} alt='arrow' style={{width: '100%'}}/>
                            </Box>
                        </Grid>

                        <Grid item sm={3} xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: 2 }}>
                            <Box>
                            <img src={shield3} alt='handImg' style={{borderRadius: '50%', backgroundColor: '#FFFFFF',
                            padding: '5px 8px 2px 8px', boxSizing: 'content-box', width: '100%'}}/>
                            </Box>
                            <Typography sx={{fontSize: {lg:32, sm:18}, color: '#FFFFFF', marginTop: 1}}>High End Security</Typography>
                        </Grid>
                    </Container>
                    
                </Grid>
               
            </Grid>
        </Container>
    </>
)
 

export default Content2