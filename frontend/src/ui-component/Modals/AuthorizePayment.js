import * as React from 'react';
import Loading from 'assets/images/loading.png'
import Cancel from 'assets/images/cancel.png';
import Modal from 'ui-component/Modals/Modal';
import PropTypes from 'prop-types';

import { Box, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import CustomButton from 'ui-component/buttons/CustomButton';

export default function AuthorizePayment({ open, onClose, callPrice, paymentAuthorizationStatus, paymentAuthorizationMessage }) {
    return (
        <>
            <Modal open={open} onClose={onClose}>
                {paymentAuthorizationStatus === 'processing' && (
                    <DialogTitle>
                        <Typography variant="h2">Processing</Typography>
                    </DialogTitle>
                )}
                <DialogContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: paymentAuthorizationStatus === 'processing' ? '15px' : '35px'
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <img src={paymentAuthorizationStatus === 'processing' ? Loading : Cancel} alt="" height="200" width="200" />
                        </Box>
                        {paymentAuthorizationStatus === 'processing' && <DialogContentText color='dark'>Please wait</DialogContentText>}
                        <DialogContentText color={paymentAuthorizationStatus === 'processing' ? 'dark' : 'red'}>Authorization of USD {callPrice} {paymentAuthorizationStatus === 'processing' ? 'in progress' : 'failed'}</DialogContentText>
                        {paymentAuthorizationStatus === 'error' && <DialogContentText color='red'>{paymentAuthorizationMessage}</DialogContentText>}
                        <CustomButton onClick={onClose} style={{ width: 200, borderRadius: 5 }}>
                            {paymentAuthorizationStatus === 'processing' ? 'Cancel' : 'Ok'}
                        </CustomButton>
                    </Box>
                </DialogContent>
            </Modal>
        </>
    );
}

AuthorizePayment.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    callPrice: PropTypes.string,
    paymentAuthorizationStatus: PropTypes.string,
    paymentAuthorizationMessage: PropTypes.string
};
