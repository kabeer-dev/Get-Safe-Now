import { Link ,useNavigate} from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, Box } from '@mui/material';
import newOne from 'assets/images/newOne.png';
import newTwo from 'assets/images/newTwo.png';
// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'ui-component/Logo';
import AuthRegister from './auth-forms/AuthRegister';
import AuthFooter from 'ui-component/cards/AuthFooter';
import useAuth from 'hooks/useAuth';

import AuthWrapper2 from '../AuthWrapper2';
import AuthHeader from 'ui-component/cards/AuthHeader';
// assets

import imgbg from '../../../assets/images/auth/bg-img.png'
import { display } from '@mui/system';

// ===============================|| AUTH3 - REGISTER ||=============================== //

const Register = () => {
    const theme = useTheme();
    const { isLoggedIn } = useAuth();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
   

    return (
        <>
            <AuthWrapper1>
                
                <Grid direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh'}}>
                    
                    <Grid item xs={12} >
                        <Grid container>
                            <Grid item  md={4} >
                                <Box sx={{ display: {md:'flex', xs: 'none'} }}>
                                    <img
                                        src={imgbg}
                                        alt="bg"
                                        style={{ width: '100%', height: '100vh', marginBottom: '-10px', }}
                                    />
                                </Box>

                                {/* <ImageList sx={{mt: 0, height: '800px'}}>
                                    <ImageListItem>
                                    <img src={imgbg} alt='img' />
                                    </ImageListItem>
                                </ImageList> */}
                            </Grid>
                            <Grid item md={2} />
                            <Grid item  md={4} sx={{ m: { xs: 1, sm: 3 }, mb: 0}} >
                                <AuthCardWrapper  sx={{backgroundColor: '#FAFAFA',  mt: 10}} >
                                    <Grid container spacing={2} alignItems="center" justifyContent="center" >
                                        <Grid item xs={12}>
                                            <Grid
                                                container
                                                
                                            >
                                                <Grid item>
                                                    <Stack sx={{color: '#000000'}} spacing={1}>
                                                        <Typography variant='h1' sx={{mb: 1}}>
                                                            Welcome!
                                                        </Typography>
                                                        <Typography>
                                                            Create Your account
                                                        </Typography>
                                                        <Typography>
                                                            Verify your Email
                                                        </Typography>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <AuthRegister />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid item container direction="column" alignItems="center" xs={12}>
                                                <Typography>
                                                Already have an account?
                                                    <Typography
                                                        component={Link}
                                                        to='/login'
                                                        variant="subtitle1"
                                                        sx={{ textDecoration: 'none', ml: 1, color: '#008BFF'}}
                                                    >
                                                        Log in
                                                    </Typography>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </AuthCardWrapper>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                        <AuthFooter />
                    </Grid> */}
                </Grid>
            </AuthWrapper1>
        </>
    );
};

export default Register;
