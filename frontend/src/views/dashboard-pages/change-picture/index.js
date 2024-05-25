import React, {useState} from 'react'
import { Grid, TextField, Typography, Button, Avatar } from '@mui/material';
import useAuth from 'hooks/useAuth';
import axios from 'utils/myAxios';

const ChangePicture = () => {
  const { user } = useAuth();
  const [file, setFile] = useState('');
  const [change, setChange] = useState('')

  const handleSubmit = async (e) =>{
    
    const formData =  new FormData();
    formData.append('file', file)
    const response = await axios.post("/user/changePicture", formData );
    user.avatar = response.data.data
    setChange(response.data.data)
    alert('File Upload Successfully');
    
    // const response = await axios.post("/user/change-displayName", { avatar });
   
  }

  return (
    <>
      {/* <Typography variant='h1'>Change Picture</Typography> */}
      <Grid container>
        <Grid item lg={6} xs={12} >
         <Avatar src={`${process.env.REACT_APP_SOCKET_URL}/images/${user.avatar}`} alt='avatar' sx={{width: 100, height: 100, ml: {md: 15, xs: 8}, mb: 3}}/>
            <TextField id="outlined-basic"  variant="outlined" type='file' onChange={(e)=>setFile(e.target.files[0])} sx={{ml: 2}}/>
            <Button variant="contained" sx={{ml:3, padding: {md: '12px 20px 12px 20px'}, mt: {md: 0, xs: 1}}}  onClick={handleSubmit}>Upload</Button>
          
        </Grid>
      </Grid>
    </>
  )
}

export default ChangePicture