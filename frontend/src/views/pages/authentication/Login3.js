import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery, ImageList, ImageListItem, Box } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from './auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';
// import AuthFooter from 'ui-component/cards/AuthFooter';
import useAuth from 'hooks/useAuth';


// assets
import imgbg from '../../../assets/images/auth/bg-img.png'
import { width } from '@mui/system';
// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {
    const theme = useTheme();
    const { isLoggedIn } = useAuth();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <AuthWrapper1>
           
            <Grid direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh'}}>
                
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item  md={4} xs={12}>
                            <Box sx={{ display: {md:'flex', xs: 'none'} }}>
                                <img
                                    src={imgbg}
                                    alt="bg"
                                    style={{ width: '100%', height: '100vh', marginBottom: '-10px'}}
                                />
                            </Box>

                            {/* <ImageList sx={{mt: 0, height: '800px'}}>
                              <ImageListItem>
                                <img src={imgbg} alt='img' />
                              </ImageListItem>
                            </ImageList> */}
                        </Grid>
                        <Grid item md={2} xs={12} />
                        <Grid item md={4} xs={12} sx={{ m: { xs: 1, sm: 3 }, mb: 0}} >
                            <AuthCardWrapper  sx={{backgroundColor: '#FAFAFA',  mt: 10}} >
                                <Grid container spacing={2} alignItems="center" justifyContent="center" >
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                           
                                        >
                                            <Grid item>
                                                <Stack sx={{color: '#000000'}} spacing={1}>
                                                    <Typography variant='h1' sx={{mb: 1}}>
                                                        Welcome Back!
                                                    </Typography>
                                                    <Typography>
                                                        Login
                                                    </Typography>
                                                    <Typography>
                                                        Login to your account
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AuthLogin />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Typography>
                                            Don&apos;t have an account?
                                                <Typography
                                                    component={Link}
                                                    to={isLoggedIn ? '/pages/register/register3' : '/register'}
                                                    variant="subtitle1"
                                                    sx={{ textDecoration: 'none', ml: 1, color: '#008BFF'}}
                                                >
                                                    Sign up
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
    );
};

export default Login;
