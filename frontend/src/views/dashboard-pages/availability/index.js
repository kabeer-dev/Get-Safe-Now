import React, {useState} from 'react'
import { Grid, Typography, Button, FormControlLabel, Radio, FormControl, FormLabel, RadioGroup } from '@mui/material';
import useAuth from 'hooks/useAuth';
import axios from 'utils/myAxios';

const Availability = () => {
  const { user, changeOnlineAvailability } = useAuth();
  const [onlineAvailability, setOnlineAvailability] = useState(user.onlineAvailability);
  const [change, setChange] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await changeOnlineAvailability(onlineAvailability).then(
      ()=>{
        setChange(onlineAvailability);
        window.location.reload();
    }
      
    );
    
  }

  return (
    <>
      {/* <Typography variant='h1' sx={{ fontSize: {md: '28px', xs: '16px'} }}> Availability </Typography> */}
      <Grid container>
      
        <Grid item  md={6} xs={12} >
        <form method='POST' onSubmit={handleSubmit}>
          <Typography  sx={{ fontSize: {md:'24px', sm:'16px', xs:'16px'}, fontWeight:'bold' }}>Current Availability: {(user.onlineAvailability !== 1) ? <span style={{color: 'red'}}>Offline</span> : <span style={{color: 'green'}}>Online</span>  }</Typography> 
          <br/>
        <FormControl>
            {/* <FormLabel id="demo-radio-buttons-group-label">Availability</FormLabel> */}
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
              value={onlineAvailability}
            >
              <FormControlLabel value={1} control={<Radio />} label="Availabile" onChange={(e) => setOnlineAvailability(Number(e.target.value))}/>
              <FormControlLabel value={2} control={<Radio />} label="Not Availabile" onChange={(e) => setOnlineAvailability(Number(e.target.value))}/>
            </RadioGroup>
          </FormControl><br/>
          <Button variant="contained" sx={{mt: 2}} type='submit'>Update</Button>
          </form>
        </Grid>
        
      </Grid>
    </>
  )
}

export default Availability