import React, { useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    FilledInput,
    TextField,
    Typography,
    useMediaQuery,
    Input
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


// project imports
import useAuth from 'hooks/useAuth';
import useConfig from 'hooks/useConfig';
import useScriptRef from 'hooks/useScriptRef';
import Google from 'assets/images/icons/google.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { strengthColor, strengthIndicatorNumFunc } from 'utils/password-strength';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
// ===========================|| FIREBASE - REGISTER ||=========================== //

const FirebaseRegister = ({ ...others }) => {
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const { borderRadius } = useConfig();
    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(false);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState();
    const { register } = useAuth();
    const nevigate=useNavigate()
    // const googleHandler = async () => {
    //     try {
    //         await firebaseGoogleSignIn();
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const changePassword = (value) => {
        const temp = strengthIndicatorNumFunc(value);
        setStrength(temp);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword('123456');
    }, []);

   
    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
               {/* <Grid item xs={12}>
                    <AnimateButton>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={googleHandler}
                            size="large"
                            sx={{
                                color: 'grey.700',
                                backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100]
                            }}
                        >
                            <Box sx={{ display: 'flex', mr: { xs: 1, sm: 2, width: 20 } }}>
                                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
                            </Box>
                            Sign up with Google
                        </Button>
                    </AnimateButton>
                        </Grid> */}
                {/* <Grid item xs={12}>
                    <Box sx={{ alignItems: 'center', display: 'flex' }}>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                        <Button
                            variant="outlined"
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                borderColor:
                                    theme.palette.mode === 'dark'
                                        ? `${theme.palette.dark.light + 20} !important`
                                        : `${theme.palette.grey[100]} !important`,
                                color: `${theme.palette.grey[900]} !important`,
                                fontWeight: 500,
                                borderRadius: `${borderRadius}px`
                            }}
                            disableRipple
                            disabled
                        >
                            OR
                        </Button>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                        </Grid> */}
               {/* <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign up with Email address</Typography>
                    </Box>
                    </Grid> */}
            </Grid>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: '',
                    firstName: '',
                    lastName: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    firstName: Yup.string().required('First Name is required'),
                    lastName: Yup.string().required('Last Name is required'),
                    email: Yup.string().required('Email is required'),
                    password: Yup.string().max(255).required('Password is required'),
                    confirmPassword: Yup.string().max(255).required('Confirm Password is required'),
                    
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {

                    try {
                        await register(values.firstName, values.lastName, values.email,  values.password, values.confirmPassword);
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                            // dispatch(
                            //     openSnackbar({
                            //         open: true,
                            //         message: 'Your registration has been successfully completed.',
                            //         variant: 'alert',
                            //         alert: {
                            //             color: 'success'
                            //         },
                            //         close: false
                            //     })
                            // );
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err?.response?.data?.message ?? err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Grid container spacing={matchDownSM ? 0 : 2} sx={{mt: 3}}>
                            <Grid item xs={12} md={6} >
                            <FormControl fullWidth error={Boolean(touched.firstName && errors.firstName)}  sx={{ ...theme.typography.customInput }}>
                                <Typography sx={{color: '#1967D2'}}>First Name</Typography>
                                <OutlinedInput
                                    fullWidth
                                    value={values.firstName}
                                    margin="normal"
                                    name="firstName"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    
                                    inputProps={{}}
                                    sx={{ ...theme.typography.customInput }}
                                />
                                 {touched.firstName && errors.firstName && (
                                <FormHelperText error id="standard-weight-helper-text-firstName-login">
                                    {errors.firstName}
                                </FormHelperText>
                            )}
                            </FormControl>
                               
                            </Grid>
                            <Grid item xs={12} md={6}>
                            <FormControl fullWidth error={Boolean(touched.lastName && errors.lastName)}  sx={{ ...theme.typography.customInput }}>
                                <Typography sx={{color: '#1967D2'}}>Last Name</Typography>
                                <OutlinedInput
                                
                                    fullWidth
                                    value={values.lastName}
                                    margin="normal"
                                    name="lastName"
                                    type="text"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    inputProps={{}}
                                    sx={{ ...theme.typography.customInput }}
                                />
                               {touched.lastName && errors.lastName && (
                                <FormHelperText error id="standard-weight-helper-text-lastName-login">
                                    {errors.lastName}
                                </FormHelperText>
                            )}
                            </FormControl>
                            </Grid>
                        </Grid> 
               


                <FormControl fullWidth error={Boolean(touched.email && errors.email)}  sx={{ ...theme.typography.customInput }}>
                            <Typography sx={{color: '#1967D2'}}>Email Address</Typography>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Email Address / Username"
                                inputProps={{}}
                                sx={{mt: 1}}

                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            // onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            <MailOutlineIcon sx={{color: '#0593FF'}}/>
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <Grid container spacing={matchDownSM ? 0 : 2}>
                            <Grid item xs={12} md={6} >
                            <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <Typography sx={{color: '#1967D2'}}>Password</Typography>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                sx={{mt: 1}}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            // onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            <LockIcon sx={{color: '#0593FF'}}/>
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                            <FormControl
                            fullWidth
                            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <Typography sx={{color: '#1967D2'}}>Confirm Password</Typography>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.confirmPassword}
                                name="confirmPassword"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                sx={{mt: 1}}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            // onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            <LockIcon sx={{color: '#0593FF'}}/>
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={{}}
                            />
                            {touched.confirmPassword && errors.confirmPassword && (
                                <FormHelperText error id="standard-weight-helper-text-confirmPassword-login">
                                    {errors.confirmPassword}
                                </FormHelperText>
                            )}
                        </FormControl>
                            </Grid>
                        </Grid> 

             
                        {errors.submit  && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )
                        
                        }

                        <Box sx={{ mt: 2 }}>
                       
                            <AnimateButton>
                                <Button
                                
                                // onClick={()=>nevigate('/verfication-code')}
                                disableElevation
                                disabled={isSubmitting}
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                sx={{backgroundColor: '#1967D2'}}
                                     >
                                    NEXT
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseRegister;
