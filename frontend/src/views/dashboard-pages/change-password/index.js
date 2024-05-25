import React, {useState} from 'react'
import { Grid, TextField, Typography, Button } from '@mui/material';
import useAuth from 'hooks/useAuth';
import axios from 'utils/myAxios';

const ChangePassword = () => {
  
  const { user } = useAuth();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [change, setChange] = useState('');

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const response = await axios.post("/user/changePassword", { oldPassword, newPassword });
    console.log(response.data);
    user.password = newPassword;
    setChange(newPassword)
    // window.location.reload(); 
    alert(response.data.message)  
  }
  return (
    <>
      {/* <Typography variant='h1' sx={{ fontSize:{md:'28px', xs: '18px'} }}>Change Password</Typography> */}
      <Grid container>
        <Grid item lg={6} md={10} xs={12} >
          <form onSubmit={handleSubmit} method='POST'>
            <TextField id="outlined-basic"  variant="outlined" label="Enter Old  Password" sx={{}} onChange={(e)=> setOldPassword(e.target.value)}/>
            <TextField id="outlined-basic"  variant="outlined" label="Enter New  Password" sx={{ml:{sm:3, xs:0}, mt:{sm: 0, xs: 1}}} onChange={(e)=> setNewPassword(e.target.value)}/>
            <Button type='submit' variant="contained" sx={{ml:{sm:3, xs: 5}, padding: {sm:'12px 20px 12px 20px'}, mt:{sm: 0, xs: 1}}}>Change</Button>
          </form>
        </Grid>
      </Grid>
    </>
  )
}

export default ChangePassword