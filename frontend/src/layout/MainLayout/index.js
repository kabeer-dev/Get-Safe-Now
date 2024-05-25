import { useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { AppBar, Box, Container, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

// project imports
import Header from './Header';
import Sidebar from './Sidebar';
import HorizontalBar from './HorizontalBar';
import Breadcrumbs from 'ui-component/extended/Breadcrumbs';

import navigation from 'menu-items';
import LAYOUT_CONST from 'constant';
import useConfig from 'hooks/useConfig';
import { drawerWidth } from 'store/constant';
import { openDrawer } from 'store/slices/menu';
import { useDispatch, useSelector } from 'store';

// assets
import { IconChevronRight } from '@tabler/icons';
import VideoCallContextProvider from 'views/video-chat-app/context/VideoCallContextProvider';
import VideoCall from 'views/video-chat-app/components/VideoCall';
import InvoiceSummary from 'views/video-chat-app/components/InvoiceSummary';

// project exports
// eslint-disable-next-line
// export let socket = io.connect(process.env.REACT_APP_SOCKET_URL);

// styles
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open, layout }) => ({
    ...theme.typography.mainContent,
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.shorter + 200
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: layout === LAYOUT_CONST.VERTICAL_LAYOUT ? -(drawerWidth - 72) : '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 135 : 88
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginTop: 88
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px',
            marginTop: 88
        }
    }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shorter + 200
        }),
        marginLeft: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? '20px' : 0,
        marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 135 : 88,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.up('md')]: {
            marginTop: layout === LAYOUT_CONST.HORIZONTAL_LAYOUT ? 135 : 88
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            marginTop: 88
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            marginTop: 88
        }
    })
}));

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();

    const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);
    const { drawerType, container, layout } = useConfig();

    const [open, setOpen] = useState(drawerType === LAYOUT_CONST.DEFAULT_DRAWER && drawerOpen);

    // Video chat states
    const [title, setTitle] = useState('Waiting for permissions');
    const [description, setDescription] = useState(
        'If this model does not hide automatically due to microphone or camera conflict, try restarting your system'
    );
    const [permissionsChecked, setPermissionsChecked] = useState(false);

    useEffect(() => {
        if (drawerType === LAYOUT_CONST.DEFAULT_DRAWER) {
            setOpen(true);
            dispatch(openDrawer(true));
        } else {
            setOpen(false);
            dispatch(openDrawer(false));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawerType]);

    const handleDrawerToggle = () => {
        setOpen(!open);
        dispatch(openDrawer(!open));
    };

    useEffect(() => {
        if (drawerType === LAYOUT_CONST.DEFAULT_DRAWER) {
            dispatch(openDrawer(true));
        }
    }, []);

    useEffect(() => {
        if (matchDownMd) {
            setOpen(true);
            dispatch(openDrawer(true));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownMd]);

    useEffect(() => {
        if (open !== drawerOpen) setOpen(drawerOpen);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawerOpen]);

    const condition = layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd;

    const header = useMemo(
        () => (
            <Toolbar sx={{ p: condition ? '10px' : '16px' }}>
                <Header open={open} handleDrawerToggle={handleDrawerToggle} />
            </Toolbar>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [layout, matchDownMd, open]
    );

    // Video chat functions
    function checkIfBrowserIsChrome() {
        const isChromium = window.chrome;
        const winNav = window.navigator;
        const vendorName = winNav.vendor;
        const isOpera = typeof window.opr !== 'undefined';
        const isIEedge = winNav.userAgent.indexOf('Edg') > -1;
        const isIOSChrome = winNav.userAgent.match('CriOS');
        let status;

        if (isIOSChrome) {
            status = true;
        } else if (
            isChromium !== null &&
            typeof isChromium !== 'undefined' &&
            vendorName === 'Google Inc.' &&
            isOpera === false &&
            isIEedge === false
        ) {
            status = true;
        } else {
            status = false;
        }

        return status;
        // return true;
    }

    function checkIfBrowserIsOnMobileOrTablet() {
        let check = false;
        (function (a) {
            if (
                /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
                    a
                ) ||
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                    a.substr(0, 4)
                )
            )
                check = true;
        })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
        // return false;
    }

    async function allPermissionsAreEnabled() {
        let micAndCameraPerm = false;
        let notiPerm = false;

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            micAndCameraPerm = true;
        } catch (error) {
            micAndCameraPerm = false;
        }
        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                notiPerm = true;
            } else if (Notification.permission === 'denied') {
                notiPerm = false;
            } else {
                await Notification.requestPermission().then((permission) => {
                    if (permission === 'granted') {
                        notiPerm = true;
                    } else {
                        notiPerm = false;
                    }
                });
            }
        } else {
            notiPerm = true;
            console.error('Notification API is not supported in this browser.');
        }
        return micAndCameraPerm && notiPerm;
    }

    async function checkingValidations() {
        // if (checkIfBrowserIsOnMobileOrTablet()) {
        //     setTitle('Please download the mobile app.');
        //     setDescription('Play store and app store links are given below');
        // } else 
        if (!checkIfBrowserIsChrome()) {
            setTitle('Please use Google Chrome browser');
            setDescription('This browser is not supported yet');
        } else {
            const permissionsEnabled = await allPermissionsAreEnabled();
            if (permissionsEnabled) {
                setPermissionsChecked(true);
            } else {
                setTitle('Permissions required');
                setDescription('All permissions are required e.g microphone, camera and notifications.');
            }
        }
    }

    useEffect(() => {
        checkingValidations();
    }, []);

    return (
        <>
            {checkIfBrowserIsChrome() &&
            //  !checkIfBrowserIsOnMobileOrTablet() && 
             permissionsChecked ? (
                <VideoCallContextProvider>
                    <VideoCall />
                    {/* <InvoiceSummary /> */}
                    <Box sx={{ display: 'flex' }}>
                        <CssBaseline />
                        {/* header */}
                        <AppBar
                            position="fixed"
                            elevation={0}
                            sx={{
                                bgcolor: 'background.default',
                                transition: drawerOpen ? theme.transitions.create('width') : 'none'
                            }}
                        >
                            {header}
                        </AppBar>

                        {/* horizontal menu-list bar */}
                        {layout === LAYOUT_CONST.HORIZONTAL_LAYOUT && !matchDownMd && <HorizontalBar />}

                        {/* drawer */}
                        {(layout === LAYOUT_CONST.VERTICAL_LAYOUT || matchDownMd) && (
                            <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} />
                        )}

                        {/* main content */}
                        <Main theme={theme} open={drawerOpen} layout={layout}>
                            <Container maxWidth={container ? 'lg' : false}>
                                {/* breadcrumb */}
                                <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign />
                                <Outlet />
                            </Container>
                        </Main>
                    </Box>
                </VideoCallContextProvider>
            ) : (
                <div>
                    <div className="bg-blur" />
                    <div className="center-model">
                        <h1>{title}</h1>
                        <div className="text-center">
                            <span>({description})</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MainLayout;
