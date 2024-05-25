import * as React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { padding } from '@mui/system';
import { Avatar, Grid } from '@mui/material';
import Logo from 'ui-component/Logo';

export default function AuthHeader() {
    return (
        <Grid container>  
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" elevation={0} style={{ background: '#FFFFFF', height: '70px' }}>
                <Grid container>
                    <Grid xs={2} />
                    <Grid xs={4} style={{ display: 'flex' }}>
                        <Grid item sx={{ mb: 3, width: '50px', paddingTop: '8px' }}>
                            <Link to="#">
                                <Logo />
                            </Link>
                        </Grid>
                        <h3 style={{ color: '#02B100', paddingTop: '9px', paddingLeft: '10px' }}>Help So Easy </h3>
                    </Grid>
                    <Grid xs={4} style={{ textAlign: 'right', paddingTop: '24px' }}>
                        <Link style={{ color: '#02B100' }} to="/login">
                            Login
                        </Link>
                    </Grid>
                    <Grid xs={2} />
                </Grid>
            </AppBar>
        </Box>
     </Grid>
    );
}