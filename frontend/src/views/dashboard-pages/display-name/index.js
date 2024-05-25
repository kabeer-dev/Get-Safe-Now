import React, { useState } from 'react'

import { Grid, TextField, Typography, Button } from '@mui/material';
import useAuth from 'hooks/useAuth';
import axios from 'utils/myAxios';

const DisplayName = () => {
  const { user, changeDisplayName } = useAuth();
  const [displayName, setDisplayName] = useState((user.displayName)? user.displayName: 'No Display Name');
  const [change, setChange] = useState('');

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log(displayName)
    // const response = await axios.post("/user/changeDisplayName", { displayName });
    try {
      await changeDisplayName(displayName);
  } catch (err) {
      console.error(err);
  }
    
    // console.log(change, response)
    setChange(displayName) 
  }

  return (
    <>
      {/* <Typography variant='h1'>Display Name</Typography> */}
      <Grid container>
        <Grid item md={6} xs={12} sx={{display: 'flex'}}>
          <form onSubmit={handleSubmit} method='POST' >
            {/* <Typography variant='h2' sx={{mt: 1}}>Current Display Name: <span style={{color: '#1967D2'}}>{(user.displayName)? user.displayName: 'No Display Name'}</span></Typography><br/><br/> */}
            <TextField id="outlined-basic"  variant="outlined" label={(user.displayName) ? user.displayName : `${user.firstName}  ${user.lastName}`} name='displayName' sx={{ width: {lg: '400px'} }} onChange={(e) => setDisplayName(e.target.value)}  required/>
            <Button type='submit' variant="contained" sx={{ml:3, padding: {md: '12px 20px 12px 20px'} ,mt: {md: 0, xs: 1} }}>Update</Button>
          </form>
         
        </Grid>
      </Grid>
    </>
  )
}

export default DisplayName