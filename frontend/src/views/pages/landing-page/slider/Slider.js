import React from 'react';
import {Box, Grid, Container, Typography, Button} from '@mui/material';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import bannerBg from 'assets/images/LandingPage/banner_bg.png';
// import bannerRghtBgPurple from 'assets/images/LandingPage/banner-right-bg-purple.png'
import bannerRightImg1 from 'assets/images/LandingPage/br-img1.png'
import bannerRightImg2 from 'assets/images/LandingPage/br-img2.png'
import bannerRightImg3 from 'assets/images/LandingPage/br-img3.png'
import bannerRightImg4 from 'assets/images/LandingPage/br-img4.png'
import brAndriodImg from 'assets/images/LandingPage/br-andriod-img.png'
import brAppleImg from 'assets/images/LandingPage/br-apple-img.png'
import brLaptopImg from 'assets/images/LandingPage/br-laptop-img.png'
import brWindowImg from 'assets/images/LandingPage/br-window-img.png'


const Slider = () => (
    <>
        <Box sx={{
            // backgroundImage: `url(${bannerBg})`, 
            // backgroundSize: 'cover',
            // backgroundRepeat: 'no-repeat',
            // width: '100%',
            // height: 'auto'
            }}>
            <Grid container >
                <Container sx={{ display: {md:'flex', sm:'block'}, textAlign: {sm:'left', xs:'center'} }}>
                    <Grid item xl={7} lg={7} md={7} sm={12} sx={{mt: 10}}>
                        <Typography variant='h1' sx={{fontSize: {lg: 65, sm: 48}, lineHeight: 1.2, color: '#000000'}}>
                            Empower Your App <br/>
                            With Secure <br/>
                            Video, Voice, & Chat <br/>
                            <span style={{borderBottom: '2px solid #1967D2', paddingBottom: 10}}>
                                Capabilities
                            </span>
                        </Typography>

                        <Typography sx={{mt: 5, color: '#707070', fontSize:{lg: 22, sm: 18}}}>
                            <span style={{color: '#008BFF'}}>Get Safe Now</span> is your go-to platform for immersive video
                            communication. Experience high-quality video chats,
                            customizable features, and top-notch security. Say hello
                            to meaningful connections and seamless conversations,
                            all from your preferred device.
                        </Typography>

                        <Button variant="contained" sx={{backgroundColor: '#1967D2', mt: 4}} endIcon={<ChevronRightIcon />}>
                            Join the Conversation
                        </Button>
                    </Grid>

                    <Grid item xl={5} lg={5} md={5} sm={12} sx={{mt: 10}}>
                        <Container>
                            <Grid container xs={12} spacing={2} sx={{justifyContent: 'center'}}>
                                <Grid item xs={6}>
                                    <img src={bannerRightImg1} alt='sliderImg1' style={{width: '100%', height: 'auto', boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '5px' }}/>
                                </Grid>

                                <Grid item xs={6}>
                                    <Grid container xs={12}>
                                        <Grid item xs={1}/>
                                        <Grid item xs={3}>
                                        <img src={brAndriodImg} alt='sliderImg1' style={{ width: '100%' }}/>
                                        </Grid>
                                        <Grid item xs={1}/>
                                        <Grid item xs={3}>
                                        <img src={brAppleImg} alt='sliderImg1' style={{ width: '100%' }}/>
                                        </Grid>
                                    </Grid>
                                    <img src={bannerRightImg2} alt='sliderImg1' style={{width: '100%', height: 'auto', marginTop: 3}}/>
                                </Grid>

                            </Grid>

                            <Grid container xs={12} spacing={2} sx={{justifyContent: 'center'}}>
                                <Grid item xs={6}>
                                    <img src={bannerRightImg3} alt='sliderImg1' style={{width: '100%', height: 'auto', boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '5px'}}/>

                                    <Grid container xs={12} sx={{mt: 2}}>
                                        <Grid item xs={4}/>
                                        <Grid item xs={3}>
                                        <img src={brWindowImg} alt='sliderImg1' style={{ width: '100%' }}/>
                                        </Grid>
                                        <Grid item xs={1}/>
                                        <Grid item xs={3}>
                                        <img src={brLaptopImg} alt='sliderImg1' style={{ width: '100%' }}/>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={6}>
                                    <Box sx={{border: '2px solid #FFFFFF', padding: 1, borderRadius: '5px'}}>
                                        <img src={bannerRightImg4} alt='sliderImg1' style={{width: '100%', height: 'auto' , borderRadius: '5px'}}/>
                                    </Box>
                                  
                                </Grid>

                            </Grid>
                        </Container>
                        
                    </Grid>
                </Container>
            </Grid>
        </Box>
    </>
)
 

export default Slider