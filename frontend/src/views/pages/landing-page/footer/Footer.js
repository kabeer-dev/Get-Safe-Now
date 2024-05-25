import React from 'react'
import {Grid, Container, Typography, List, ListItem, ListItemIcon, ListItemText, Divider} from '@mui/material';

import PlaceIcon from '@mui/icons-material/Place';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';

import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';

const productListItems = ['SMS chats', 'Send bulk SMS', 'Voice call', 'Video Chat', 'File sharing', 'Screen sharing', 'Encryption']

const resourceListItems = ['Whats new', 'FAQs', 'Help center', 'Tutorials', 'Video chat', 'Documents'];

const companyListItems = ['About Us', 'Contact Us', 'Trust center', 'Privacy policy'];

// const contextListItems = ['Carolina Avenue, Huntington Beach, California', '123-456-7890'];

const Footer = ()=>(
    <>
        <Grid sx={{backgroundColor: '#002C51'}}>
            <Container>
                <Grid container>
                    <Grid item sm={3} xs={6}>
                        <Typography sx={{color: '#FFFFFF', fontSize: {lg:24, md:18}, fontWeight: 'bold', paddingTop: 10, }}>
                            <span style={{borderBottom: '1px solid #54B1FF'}}>Products</span>
                        </Typography>
                        <List>
                            {productListItems.map((productListItem) => (
                                <ListItem sx={{color: '#FFFFFF', fontSize: {lg:18, md: 14}, padding: 0, mt: 3}}>
                                    {productListItem}
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    <Grid item sm={3} xs={6}>
                        <Typography sx={{color: '#FFFFFF', fontSize: {lg:24, md:18}, fontWeight: 'bold', paddingTop: 10, }}>
                            <span style={{borderBottom: '1px solid #54B1FF'}}>Resources</span>
                        </Typography>
                        <List>
                            {resourceListItems.map((resourceListItem) => (
                                <ListItem sx={{color: '#FFFFFF', fontSize: {lg:18, md: 14}, padding: 0, mt: 3}}>
                                    {resourceListItem}
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    <Grid item sm={3} xs={6}>
                        <Typography sx={{color: '#FFFFFF', fontSize: {lg:24, md:18}, fontWeight: 'bold', paddingTop: 10, }}>
                            <span style={{borderBottom: '1px solid #54B1FF'}}>Company</span>
                        </Typography>
                        <List>
                            {companyListItems.map((companyListItem) => (
                                <ListItem sx={{color: '#FFFFFF', fontSize: {lg:18, md: 14}, padding: 0, mt: 3}}>
                                    {companyListItem}
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    <Grid item sm={3} xs={6}>
                        <Typography sx={{color: '#FFFFFF', fontSize: {lg:24, md:18}, fontWeight: 'bold', paddingTop: 10, }}>
                            <span style={{borderBottom: '1px solid #54B1FF'}}>Contact</span>
                        </Typography>
                        <List>
                            <ListItem sx={{padding: 0, mt: 3}}>
                                <ListItemIcon>
                                    <PlaceIcon style={{color: '#FFFFFF'}}/>
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography sx={{color: '#FFFFFF', fontSize: {lg:18, md: 12}, padding: 0}}>
                                        Carolina Avenue, <br/>
                                        Huntington Beach, California
                                    </Typography>
                                </ListItemText>
                            </ListItem>

                            <ListItem sx={{padding: 0, mt: 3}}>
                                <ListItemIcon>
                                    <WifiCalling3Icon style={{color: '#FFFFFF'}}/>
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography sx={{color: '#FFFFFF', fontSize: {lg:18, md: 12}, padding: 0}}>
                                        123-456-7890
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                         
                        </List>
                    </Grid>
                </Grid>
                <Divider textAlign="center" sx={{mt: 5}}>
                   <span style={{color: '#FFFFFF'}}>
                        <TwitterIcon style={{margin: '0px 5px 0px 5px'}}/>
                        <InstagramIcon style={{margin: '0px 5px 0px 5px'}}/>
                        <FacebookIcon style={{margin: '0px 5px 0px 5px'}}/>
                        <PinterestIcon style={{margin: '0px 5px 0px 5px'}}/>
                        <YouTubeIcon style={{margin: '0px 5px 0px 5px'}}/>
                    </span>
                </Divider>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography sx={{textAlign: 'center', color: '#FFFFFF', fontSize: {sm:18, xs:14}, mt: 5, paddingBottom: 3}}>
                            Get Safe Now. 2023 All Rights Reserved
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Grid>
    </>
) 

export default Footer