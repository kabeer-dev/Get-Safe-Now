import React from 'react';
import {Grid, Container, Typography, Box} from '@mui/material';

import leftImg1 from 'assets/images/LandingPage/content3-dispaly-img.png';
import leftImg2 from 'assets/images/LandingPage/content3-img2.png';
import leftImg3 from 'assets/images/LandingPage/content3-img3.png';
import mainimg from 'assets/images/LandingPage/content3_main.png';

import icon1 from 'assets/images/LandingPage/content3Icon1.png';
import icon2 from 'assets/images/LandingPage/content3Icon2.png';
import icon3 from 'assets/images/LandingPage/content3Icon3.png';
import icon4 from 'assets/images/LandingPage/content3Icon4.png';
import icon5 from 'assets/images/LandingPage/content3Icon5.png';
import icon6 from 'assets/images/LandingPage/content3Icon6.png';


const Content3 = () => (
    <>
        <Container sx={{mt: 10}} style={{height: 'auto'}}>
            <Grid container>
                <Grid xs={12} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Typography  color='#000000' sx={{ fontSize: {lg: '48px', md: '40px', sm: '30px', xs:'10px'}, fontWeight:'bold' }}>
                        Ensuring Your Privacy with <spna style={{color: '#008BFF'}}>Advanced Encryption</spna>
                    </Typography>
                    <hr style={{backgroundColor: '#1967D2', border: '1px solid #1967D2', width: '15%'}}/>
                </Grid>
           
                <Grid xs={12} sx={{display: {md: 'flex', sm:'block'}, justifyContent:{xs:'center'}, flexDirection: 'row', mt: 5}}>

                    <Grid item md={6} xs={12}>
                        {/* <img src={leftImg2} alt='img2' style={{ position: 'relative',  left: -20, zIndex: 2,}}/>
                        <Container style={{ position: 'relative', top: -150, zIndex: 1, width: '100%', height: 'auto', padding: 80 }} >
                                <img src={leftImg1} alt='img1' style={{ width: '100%', height: 'auto' }}/>
                        </Container>
                        <Box>
                        <img src={leftImg3} alt='img3' style={{ position: 'relative', zIndex: 1, top: -440, left: -20}}/>
                        </Box> */}
                        <Box>
                            <img src={mainimg} alt='main_Img' style={{ width:'100%' }}/>
                        </Box>
                    </Grid>



                    <Grid item md={6} xs={12}>
                        <Grid container spacing={7}>
                            <Grid item xs={1}>
                                <img src={icon1} alt='icon1'/>
                            </Grid>
                            <Grid item xs={10} sx={{mt: 1}}>
                                <Typography sx={{color: '#000000', fontSize: {sm: 25, xs:20}, fontWeight: 'bold'}}>End-to-End Encryption:</Typography>
                                <Typography sx={{mt: 1, olor: '#000000', fontSize: {sm:20, xs:15}}}>
                                    Messages and video/audio streams are fully secure, only
                                    accessible to participants.
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={7}>
                            <Grid item xs={1}>
                                <img src={icon2} alt='icon2'/>
                            </Grid>
                            <Grid item xs={10} sx={{mt: 1}}>
                                <Typography sx={{color: '#000000', fontSize: {sm: 25, xs:20}, fontWeight: 'bold'}}>
                                    Secure Protocols
                                </Typography>
                                <Typography sx={{mt: 1, olor: '#000000', fontSize: {sm:20, xs:15}}}>
                                    Using industry-standard TLS encryption for data protection
                                    during transmission.
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={7}>
                            <Grid item xs={1}>
                                <img src={icon3} alt='icon3'/>
                            </Grid>
                            <Grid item xs={10} sx={{mt: 1}}>
                                <Typography sx={{color: '#000000', fontSize: {sm: 25, xs:20}, fontWeight: 'bold'}}>
                                    Authentication:
                                </Typography>
                                <Typography sx={{mt: 1, olor: '#000000', fontSize: {sm:20, xs:15}}}>
                                    Verifying user identities to prevent unauthorized access.
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={7}>
                            <Grid item xs={1}>
                                <img src={icon4} alt='icon4'/>
                            </Grid>
                            <Grid item xs={10} sx={{mt: 1}}>
                                <Typography sx={{color: '#000000', fontSize: {sm: 25, xs:20}, fontWeight: 'bold'}}>
                                    Data Handling:
                                </Typography>
                                <Typography sx={{mt: 1, olor: '#000000', fontSize: {sm:20, xs:15}}}>
                                     storing video chat data on servers, minimizing privacy risks.
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={7}>
                            <Grid item xs={1}>
                                <img src={icon5} alt='icon5'/>
                            </Grid>
                            <Grid item xs={10} sx={{mt: 1}}>
                                <Typography sx={{color: '#000000', fontSize: {sm: 25, xs:20}, fontWeight: 'bold'}}>
                                    Two-Factor Authentication:
                                </Typography>
                                <Typography sx={{mt: 1, olor: '#000000', fontSize: {sm:20, xs:15}}}>
                                    Offering an extra layer of account security for authorized access.
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={7}>
                            <Grid item xs={1}>
                                <img src={icon6} alt='icon6'/>
                            </Grid>
                            <Grid item xs={10} sx={{mt: 1}}>
                                <Typography sx={{color: '#000000', fontSize: {sm: 25, xs:20}, fontWeight: 'bold'}}>
                                    Compliance:
                                </Typography>
                                <Typography sx={{mt: 1, olor: '#000000', fontSize: {sm:20, xs:15}}}>
                                    The platform follows data protection regulations to safeguard
                                    your privacy.
                                </Typography>
                            </Grid>
                        </Grid>
                        
                    </Grid>

                   
                </Grid>
            </Grid>
        </Container>
    </>
)
 

export default Content3