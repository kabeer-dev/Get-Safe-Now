import React from 'react'
import {Grid, Container, Typography, Box, List, ListItem, Button} from '@mui/material';

import img1 from 'assets/images/LandingPage/content4Img1.png';
import tickIcon from 'assets/images/LandingPage/content4Tick.png';
import img2 from 'assets/images/LandingPage/content3-dispaly-img.png';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const leftListItems = ['1 to 1 Text Chat Mode', 'Messaging Across Different Platforms', 'Instant Message Alerts',      'Conversations with Multiple Participants', 'Sharing Files', 'Text Correction'];

const rightListItems = ['1 to 1 Video Chat Mode', 'HD Video Call', 'Video Conferencing', 'Group Calls', 'Real Time Chat', 'Recording'];


const Content4 = () => (
    <>
        <Box sx={{background: 'linear-gradient(to bottom, #317CE2, #3F4B8E)',  height: 'auto', marginTop: 10}}>
            <Container>
                <Grid container >
                    <Grid xs={12} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 5}}>
                        <Typography color='#FFFFFF' sx={{ fontSize: {lg: '48px', md: '40px', sm: '30px', xs:'10px'}, fontWeight:'bold' }}>
                            Stay Connected with Group Chat & Calls
                        </Typography>
                        <hr style={{backgroundColor: '#FFFFFF', border: '1px solid #FFFFFF', width: '10%'}}/>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item sm={5.5} xs={12} sx={{marginTop: 5}}>
                        <Typography sx={{textAlign: 'center', color: '#FFFFFF', fontSize: {sm: '36px', xs: '28px'}, fontWeight: 'bold'}}>
                            Group Chat
                        </Typography>
                        <img src={img1} alt='img1' style={{width: '100%', height: 'auto'}}/>

                        <List>
                            {leftListItems.map((leftListItem) => (
                                <ListItem>
                                <img src={tickIcon} alt='icon'/>
                                <Typography sx={{color: '#FFFFFF', fontSize: {lg: '24px', sm: '20px'}}}> 
                                    {leftListItem}
                                </Typography>
                                </ListItem>

                            ))}

                            <ListItem>
                                <Button variant="contained" sx={{backgroundColor: '#FFFFFF', color: '#008BFF', mt: 4 ,ml: 2}} endIcon={<ChevronRightIcon />}>
                                    Get Started Now
                                </Button>
                            </ListItem>
                        </List>

                    </Grid>

                    <Grid item sm={1}/>
                    <Grid item sm={5.5} xs={12} sx={{marginTop: 5}}>
                        <Typography sx={{textAlign: 'center', color: '#FFFFFF', fontSize: {sm: '36px', xs: '28px'}, fontWeight: 'bold'}}>
                            Group Chat
                        </Typography>
                        <img src={img2} alt='img2' style={{width: '100%', height: 'auto'}}/>

                        <List>
                            {rightListItems.map((rightListItem) => (
                                <ListItem>
                                <img src={tickIcon} alt='icon'/>
                                <Typography sx={{color: '#FFFFFF', fontSize: {lg: '24px', sm: '20px', xs: '14px'}}}> 
                                    {rightListItem}
                                </Typography>
                                </ListItem>

                            ))}

                            <ListItem>
                                <Button variant="contained" sx={{backgroundColor: '#FFFFFF', color: '#008BFF', mt: 5,ml: 2}} endIcon={<ChevronRightIcon />}>
                                    Get Started Now
                                </Button>
                            </ListItem>
                        </List>

                    </Grid>

                </Grid>
            </Container>
        </Box>
   
    </>
) 

export default Content4