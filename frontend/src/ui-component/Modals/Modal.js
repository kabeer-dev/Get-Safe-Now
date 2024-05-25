import * as React from 'react';
import Close from 'assets/images/close1.png';
import PropTypes from 'prop-types';

import { Box, Dialog  } from '@mui/material';

export default function Modal({ children, open, onClose }) {
    return (
        <>
            <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} align="center">
                {open && (
                    <>
                        <Box
                            onClick={onClose}
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                paddingRight: '12px'
                            }}
                        >
                            <img src={Close} alt="" height="30" width="30" />
                        </Box>
                        {children}
                    </>
                )}
            </Dialog>
        </>
    );
}

Modal.propTypes = {
    children: PropTypes.node,
    open: PropTypes.bool,
    onClose: PropTypes.func,
};

