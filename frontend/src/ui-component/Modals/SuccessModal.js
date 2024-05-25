import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import modal from 'assets/images/Modal.png';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    height: '300px',
    width: '350px',
    p: 4,
    borderRadius: '20px'
};

export default function SuccessModal({ title, description, btnName, img, showModal = true }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const nevigate = useNavigate();

    React.useEffect(() => {
        console.log('Console1233', showModal);
    }, []);

    return (
        <div>
            <Button
                onClick={handleOpen}
                disableElevation
                type="submit"
                variant="contained"
                style={{ color: '#FFFF', background: '#02B100', width: '170px', height: '35px' }}
            >
                Confirm
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                size="xs"
            >
                <Box sx={style}>
                    <Grid style={{ textAlign: 'center' }}>
                        <Typography variant="h3">{title}</Typography> <hr style={{ background: '#02B100' }} />
                    </Grid>
                    <Grid lg={12}>
                        <Grid lg={12} style={{ textAlign: 'center' }}>
                            <img alt="not" src={img} style={{ height: '70px', width: '70px' }} />
                        </Grid>
                    </Grid>
                    <Grid>
                        <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
                            {description}
                        </Typography>
                    </Grid>
                    <hr style={{ background: '#02B100', height: '2px' }} />
                    <Grid sx={{ mt: 2, textAlign: 'center' }}>
                        <Button
                            onClick={() => nevigate('/login/new-password')}
                            disableElevation
                            type="submit"
                            variant="contained"
                            style={{ background: '#02B100', width: '120px', alignSelf: 'center', color: '#FFFF' }}
                        >
                            {btnName}
                        </Button>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}
