import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Grid, Stack, Typography } from '@mui/material';

// third-party
import OtpInput from 'react18-input-otp';
import { Link } from 'react-router-dom';
import VerificationModal from '../VerificationModal';

// ============================|| STATIC - CODE VERIFICATION ||============================ //

const AuthCodeVerification = () => {
    const theme = useTheme();
    const [otp, setOtp] = useState();
    const borderColor = theme.palette.mode === 'dark' ? theme.palette.grey[200] : theme.palette.grey[300];
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <OtpInput
                    value={otp}
                    onChange={(otpNumber) => setOtp(otpNumber)}
                    numInputs={4}
                    containerStyle={{ justifyContent: 'space-between' }}
                    inputStyle={{
                        background:"#DCFFDC",
                        width: '100%',
                        margin: '8px',
                        padding: '10px',
                        border: `1px solid ${borderColor}`,
                        borderRadius: 4,
                        ':hover': {
                            borderColor: theme.palette.primary.main
                        }
                    }}
                    focusStyle={{
                        outline: 'none',
                        border: '2px solid #DCFFDC'
                    }}
                />
            </Grid>
            <Grid item xs={12}style={{textAlign:"center"}}>
             <Typography variant="body1" component={Link} sx={{alignSelf:"center",  cursor: 'pointer' }} color="#0FE90D">
                    Resend code
                </Typography>
           </Grid>
            <Grid item xs={12} style={{textAlign:"center",paddingTop: '6px'}}>
            <VerificationModal/>
               {/* <Button disableElevation  type="submit" variant="contained" style={{background:"#02B100"}}>
                    Confirm
                </Button> */}
            </Grid>
         
        </Grid>
    );
};
export default AuthCodeVerification;
