import React from 'react'
import {Grid, Container, Typography, Box, List, ListItem} from '@mui/material';

import LaptopImg from 'assets/images/LandingPage/Content6/laptopImg.png';
import icon from 'assets/images/LandingPage/Content6/icon.png';
import fImg from 'assets/images/LandingPage/Content6/fImg.png';

import mainImg from 'assets/images/LandingPage/Content6/content6_main_img.png';


const listItems = ['Supported File Types', 'Real-time Sharing', 'File Preview', 'Download Options', 'Security']

const Content6 = () => (
    <>
        <Box sx={{backgroundColor: '#F6FCFF', paddingBottom: 5}}>
            <Container>
                <Grid container sx={{mt: 10}}>
                    <Grid xs={12} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
                        <Typography color='#000000' sx={{ fontSize: {lg: '48px', md: '40px', sm: '30px', xs:'10px'}, fontWeight:'bold' }}>
                        Seamless <spna style={{color: '#008BFF'}}>File Sharing</spna> in our Video Chat Platform
                        </Typography>
                        <hr style={{backgroundColor: '#1967D2', border: '1px solid #1967D2', width: '15%'}}/>
                    </Grid>
                </Grid>

                <Grid container  sx={{mt: 10}}>
                    <Grid item md={6} xs={12}>
                        <Typography sx={{color: '#000000', fontSize: 18, lineHeight: '1.75'}}>
                            These features enhance collaboration and <br/>
                            communication during video chats by enabling <br/>
                            users to share relevant content easily.
                        </Typography>

                        <List sx={{mt: 5}} >
                            {listItems.map((listItem) => (
                                <ListItem sx={{padding: 0}}>
                                <img src={icon} alt='icon' />
                                <Typography sx={{color: '#272222', fontSize: '22px', ml: 3, fontWeight: 'bold'}}> 
                                    {listItem}
                                </Typography>
                                </ListItem>

                            ))}
                        </List>
                    </Grid>

                    <Grid item md={6} xs={12} 
                        // sx={{
                        // backgroundImage: `url(${LaptopImg})`, 
                        // backgroundSize: 'cover',
                        // backgroundRepeat: 'no-repeat',
                        // width: '100%',
                      
                        // marginLeft: 20}}
                    >
                     
                        <img src={mainImg} alt='fImg' style={{ width: '100%' }}/>
                    
                        
                    </Grid>
                </Grid>
            </Container>
        </Box>

    </>
)


export default Content6