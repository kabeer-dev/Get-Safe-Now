import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, useMediaQuery, Button} from '@mui/material';

// project imports
import LAYOUT_CONST from 'constant';
import useConfig from 'hooks/useConfig';
import LogoSection from '../LogoSection';
import SearchSection from './SearchSection';
import MobileSection from './MobileSection';
// import ProfileSection from './ProfileSection';
// import LocalizationSection from './LocalizationSection';
// import MegaMenuSection from './MegaMenuSection';
import AvatarSetion from './AvatarSection';
import NotificationSection from './NotificationSection';

// assets
import { IconMenu2 } from '@tabler/icons';

import VideoCallIcon from '@mui/icons-material/VideoCall';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleDrawerToggle }) => {
    const theme = useTheme();

    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const { layout } = useConfig();

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>

            </Box>

            {layout === LAYOUT_CONST.VERTICAL_LAYOUT || (layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && matchDownMd) ? (
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            overflow: 'hidden',
                            transition: 'all .2s ease-in-out',
                            // background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.secondary.light,
                            // color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                            backgroundColor: 'white',
                            color: 'black',                 
                            '&:hover': {
                                // background: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                                // color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
                                backgroundColor: '#1967D2',
                                color: 'white'
                            },
                            ml: 5, mr: 5
                            
                        }}
                        onClick={handleDrawerToggle}
                        color="inherit"
                        
                    >
                        <IconMenu2 stroke={1.5} size="20px" />
                    </Avatar>
                ) : null}


            {/* header search */}
            <SearchSection />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* mega-menu */}
            <Box sx={{ display: { xs: 'none', sm: 'block' }, mr: 7 }}>
                <Button href='/friends' variant="contained" sx={{backgroundColor: '#1967D2', color: '#FFFFFF', borderRadius: 5}} startIcon={<VideoCallIcon />}>
                    Meet Now
                </Button>
            </Box>

            {/* live customization & localization */}
            {/* <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <LocalizationSection />
            </Box> */}

            {/* notification & profile */}
            <NotificationSection />
            <AvatarSetion/>
            {/* <ProfileSection /> */}

            {/* mobile header */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <MobileSection />
            </Box>
        </>
    );
};

Header.propTypes = {
    handleDrawerToggle: PropTypes.func
};

export default Header;
