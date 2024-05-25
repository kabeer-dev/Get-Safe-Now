import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Grid } from '@mui/material';
import modal from 'assets/images/Modal.png';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 420,
    width: 600,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4
};

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} disableElevation type="submit" variant="contained" style={{ background: '#02B100' }}>
                Confirm
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                size="large"
            >
                <Box sx={style}>
                    <Grid lg={12}>
                        <Grid lg={12} sx={{ marginLeft: { lg: 26, xs: 26 } }}>
                            <img alt="not" src={modal} style={{ textAlign: 'center', height: '198px', width: '96px' }} />
                        </Grid>
                    </Grid>
                    <Grid>
                        <Typography id="modal-modal-title" variant="h2" sx={{ mt: 2, textAlign: 'center' }} component="h2">
                            Verified the account
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
                            You have successfully verified the account
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2, textAlign: 'center' }}>
                            Now please complete your nickname,profile and payment method.
                        </Typography>
                    </Grid>
                    <Grid sx={{ mt: 2, textAlign: 'center' }}>
                        <Button
                            onClick={handleClose}
                            disableElevation
                            type="submit"
                            variant="contained"
                            style={{ background: '#02B100', width: '120px', alignSelf: 'center' }}
                        >
                            OK
                        </Button>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}
