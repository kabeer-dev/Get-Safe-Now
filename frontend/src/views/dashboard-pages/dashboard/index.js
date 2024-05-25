// material-ui
import { Typography, Grid, Container, Button } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
// import useAuth from 'hooks/useAuth';

import dImg from 'assets/images/Dashboard/dImg1.png';

import useAuth from 'hooks/useAuth';

// project imports
// import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
    const { user } = useAuth();

    return(
        <>
        {/* <Typography variant='h2'>Dashboard</Typography> */}
        <Grid container>
            <Grid item xl={6} lg={8} md={12} sm={12} xs={12} sx={{backgroundColor: '#5360AB', mt: 3, borderRadius: 5}}>
                <Grid container>
                    <Container sx={{display: { sm: 'flex', xs:'block'}}}>
                        <Grid item  md={8} sm={8} xs={12} sx={{ textAlign: {sm:'left', xs:'left'}}} >
                            <Typography variant='h1' sx={{color: '#FFFFFF', lineHeight: 2.5, fontSize: {xl:'34px', lg:'28px', md:'24px', sm:'20px', xs:'20px'}}}>Hello, {(user.displayName)? user.displayName : `${user.firstName}  ${user.lastName}`}</Typography>
                            <Typography sx={{color: '#FFFFFF', fontSize: {xs:'16px'}}}>Welcome Back!</Typography>
                            <Button variant="contained" href="/friends" sx={{backgroundColor: '#FFFFFF', color: '#1967D2', mt: {sm:10, xs:2},
                            '&:hover':{
                                backgroundColor: '#1967D2',
                                color: 'white'
                            }
                            }} 
                                endIcon={<EastIcon />}>
                                Get started 
                            </Button>
                        </Grid>
                        <Grid item md={4} sm={4} xs={12} sx={{my: 3, textAlign: {sm:'end', xs:'center'}}}>
                            <img src={dImg} alt='dImg' style={{ width: 'auto' }}/>
                        </Grid>
                    </Container>
                </Grid>

            </Grid>
        </Grid> 
    </>
    )
    
                        };

export default SamplePage;
