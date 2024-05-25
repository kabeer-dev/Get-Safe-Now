import React from 'react'
import {Grid, Container, Typography, List, ListItem} from '@mui/material';

import icon1 from 'assets/images/LandingPage/Content5/icon1.png';
import icon2 from 'assets/images/LandingPage/Content5/icon2.png';
import icon3 from 'assets/images/LandingPage/Content5/icon3.png';
import icon4 from 'assets/images/LandingPage/Content5/icon4.png';
import icon5 from 'assets/images/LandingPage/Content5/icon5.png';
import icon6 from 'assets/images/LandingPage/Content5/icon6.png';
import icon7 from 'assets/images/LandingPage/Content5/icon7.png';
import icon8 from 'assets/images/LandingPage/Content5/icon8.png';

const imgItems = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8];

const headingItems = ['User Permissions', 'User Interface', 'Security and Privacy', 'Quality Control', 'Recording', 'Multiple Participants', 'Mobile Compatibility', 'Screen Sharing'];

const bodyItems = ['Implement a system for obtaining user permissions to access their screen. This may involve asking for permissionthrough browser', 'Clearly indicate when screen sharing is active, possibly by displaying a small preview of the shared screen alongside the video feed.', 'Ensure that screen sharing is secure. Use encryption to protect shared content.', 'Allow users to adjust screen sharing quality and frame rate settings based on their network bandwidth.', 'Consider adding the option to record the shared screen for future reference. Ensure compliance with privacy regulations.', 'Allow multiple participants to share their screens simultaneously, if needed.', 'Ensure that screen sharing is compatible with mobile devices. This might require additional development and testing.', 'Handle different screen resolutions and aspect ratios gracefully.'];

const Content5 = () => (
    <>
        <Container>
            <Grid container sx={{mt: 10}}>
                <Grid xs={12} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
                    <Typography color='#000000' sx={{ fontSize: {lg: '48px', md: '40px', sm: '30px', xs:'10px'}, fontWeight:'bold' }}>
                    Optimize Your Video Chat with <spna style={{color: '#008BFF'}}>Screen Sharing</spna>
                    </Typography>
                    <hr style={{backgroundColor: '#1967D2', border: '1px solid #1967D2', width: '15%'}}/>
                </Grid>

                <Grid container>
                    {headingItems.map((headingItem, index) => (
                        <Grid item md={3} sm={6} xs={12} sx={{display: 'flex', flexDirection: 'column', mt: 5}}>
                            <List>
                                <ListItem>
                                    <img src={imgItems[index]} alt='icon1' style={{margin: 'auto'}}/>
                                </ListItem>
                            
                                <ListItem sx={{textAlign: 'center'}}>
                                    <Typography sx={{color: '#000000', fontSize: {lg: 24, xs: 20}, fontWeight: 'bold', mt: 2, margin: 'auto'}}>
                                        {headingItem}
                                    </Typography>
                                </ListItem>

                                <ListItem>
                                    <Typography sx={{color: '#000000', fontSize: {lg: 16, xs: 12}, textAlign: 'center', mt: 2, margin: 'auto'}}>
                                        {bodyItems[index]}
                                    </Typography>
                                </ListItem>
                            </List>
                    
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Container>
    </>
) 

export default Content5