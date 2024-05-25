// material-ui
import { Link, Typography, Stack,IconButton, Grid } from '@mui/material';
import appleLogo from "assets/images/appleLogo.jpg";
import google from "assets/images/google.png";
import Logo from 'ui-component/Logo';

import { ImTwitter } from 'react-icons/im';
import { GrInstagram } from 'react-icons/gr';
import { TfiFacebook ,TfiPinterestAlt} from 'react-icons/tfi';
import { IoLogoYoutube } from 'react-icons/io';
import { MdSupportAgent } from 'react-icons/md';
import { HiOutlineMailOpen } from 'react-icons/hi';

import { display } from '@mui/system';
// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Grid container spacing={2} style={{ background: '#DCFFDC' }}>
        <Grid   lg={2}/>
        <Grid xs={12} md={6} lg={3}>
           <Grid  style={{ display: 'flex' }}>
            <Grid item sx={{ mb: 3, width: '50px', paddingTop: '8px' }}>
                <Link to="#">
                    <Logo />
                </Link>
            </Grid>
            <h3 style={{ color: '#02B100',paddingTop: '9px', paddingLeft: '10px' }}>Help So Easy </h3>
            </Grid>
            <p style={{ marginTop:"-14px", textAlign:"left" ,paddingRight:"35px"}}>Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem
            Ipsum has been the industry     s standard
            dummy text ever since the 1500s. </p>
            <h2 style={{color:"green" ,paddingTop:"15px"}}>Follow Us</h2>
            <Grid>
            <IconButton color="primary" size="small">
            <ImTwitter style={{ color: '#00BCEC' }} />
            </IconButton>
            <IconButton color="primary" size="small">
            <GrInstagram style={{ color: '#EC00C5' }} />
            </IconButton>
            <IconButton color="primary" size="small">
            <TfiFacebook style={{ color: '#0037EC' }} />
            </IconButton>
            
            <IconButton color="primary" size="small">
            <TfiPinterestAlt style={{ color: '#AA2C18' }} />
            </IconButton>
            <IconButton color="primary" size="small">
            <IoLogoYoutube style={{ color: '#FF0000' }} />
            </IconButton>
         </Grid>
            </Grid>
        <Grid xs={12} md={6} lg={2}>
            <h3 style={{ color: '#02B100', paddingTop: '9px', paddingLeft: '10px' }}>Help So Easy </h3>
            <Grid style={{ marginTop:"0px", textAlign:"left",paddingLeft:"10px"}}>
            <h4 style={{marginTop:"-12px"}}>Search fro Helper</h4>
            <h4 style={{marginTop:"-12px"}}>LOGIN</h4>
            <h4 style={{marginTop:"-12px"}}>REGISTER</h4>
            <h4 style={{marginTop:"-12px"}}>Booking</h4>
            <h4 style={{marginTop:"-12px"}}>Customer Care</h4>
            </Grid>
            </Grid>
            <Grid xs={12} md={6} lg={2} >
            <h3 style={{ color: '#02B100', paddingTop: '9px', paddingLeft: '10px' }}>Help So Easy </h3>
            <Grid style={{paddingTop:"0px",  textAlign:"left",paddingLeft:"10px"}}>
            <h4 style={{marginTop:"-12px"}}>Appointment</h4>
            <h4 style={{marginTop:"-12px"}}>Video Calls</h4>
            <h4 style={{marginTop:"-12px"}}>Login</h4>
            <h4 style={{marginTop:"-12px"}}>Register</h4>
            <h4 style={{marginTop:"-12px"}}>Profile</h4>
           </Grid>
            </Grid>
        <Grid xs={12} md={6} lg={2} >
          <h3 style={{ color: '#02B100', paddingTop: '9px', paddingLeft: '10px' }}>Download Apps</h3>
        <Grid style={{paddingLeft:"7px"}}><img alt="not" src={appleLogo} style={{height:"50px",width:"180px",objectFit:"cover" , borderRadius:"10px"}} />
        <Grid style={{paddingLeft:"02px"}}> <img alt="not" src={google} style={{height:"50px",width:"180px",objectFit:"cover" ,borderRadius:"10px"}} />
        </Grid>
        </Grid>
        <Grid style={{paddingLeft:"7px",display:"flex"}}>  <IconButton color="primary" size="large">
        <MdSupportAgent style={{ color: '#707070' }} />
        </IconButton>
        <p>+0123-456-678</p>
        </Grid>
        <Grid style={{paddingLeft:"7px",display:"flex" ,marginTop:"-14px"}}> 
         <IconButton color="primary" size="large">
        <HiOutlineMailOpen style={{ color: '#707070' }} />
        </IconButton>
        <p>helpsoeasy@gmail.com</p>
        </Grid>
       
        </Grid>
        <Grid  lg={1} />
    </Grid>
);

export default AuthFooter;
