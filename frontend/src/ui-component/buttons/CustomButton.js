import Button from '@mui/material/Button';
import PropTypes from 'prop-types';

const CustomButton = ({ children, type, onClick, style }) => (
    <Button
        variant="contained"
        type={type ?? 'submit'}
        onClick={onClick}
        style={{ ...style, backgroundColor: '#02B100', borderRadius: '30px', padding: '10px 50px', color: 'white' }}
    >
        {children}
    </Button>
);

CustomButton.propTypes = {
    children: PropTypes.node,
    type: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.object
};

export default CustomButton;
