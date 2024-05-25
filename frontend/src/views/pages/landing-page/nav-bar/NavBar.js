import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

import useAuth from 'hooks/useAuth';

import logo from 'assets/images/Logos/GetSafeNow-Logo.png';

const pages = ['Products', 'Blogs', 'Resources', 'About'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    // const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    // const handleOpenUserMenu = (event) => {
    //   setAnchorElUser(event.currentTarget);
    // };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // const handleCloseUserMenu = () => {
    //   setAnchorElUser(null);
    // };

    const { isLoggedIn } = useAuth();

    return (
        <AppBar position="static" sx={{ backgroundColor: '#FFFFFF', mb: {sm:0, xs: -5}}}>
            <Container>
                <Grid container >
                    <Grid item md={2} sm={3} xs={6} sx={{ marginTop: {md:'15px', xs:'20px'}}}>
                        <img src={logo} alt="Logo" style={{ width: '100%', height: 'auto' }} />
                    </Grid>
                
                    <Grid item md={6} sm={9} xs={6} sx={{ pl: {md:5, sm: 35, xs:10}, mt:{md: 0, xs:1}}}>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', color: 'black' }, justifyContent: 'end' }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left'
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left'
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' }
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}

                                <Grid
                                    item
                                    md={3}
                                    xs={12}
                                    sx={{ display: 'flex', justifyContent: { md: 'end', xs: 'center', }, marginTop: { md: '15px' } }}
                                >
                                    <Box sx={{ flexGrow: 0 }}>
                                        {!isLoggedIn ? (
                                            <Box>
                                                <Typography  sx={{ mt: {sm: 0.5, xs: 1.5} }}>
                                                    <Link style={{ textDecoration: 'none', color: '#454f5f',}} to="/login">
                                                        Login
                                                    </Link>
                                                </Typography>

                                                <Typography  sx={{ mt: {sm: 1.5, xs: 2.5} }}>
                                                    <Link style={{ textDecoration: 'none', color: '#454f5f',}} to="/register">
                                                        Signup
                                                    </Link>
                                                </Typography>
                                            </Box>
                                            
                                        ) : (
                                            <Typography sx={{ mt: 1 }}>
                                                <Link style={{ textDecoration: 'none', color: '#454f5f', }} to="/dashboard">
                                                    Dashboard
                                                </Link>
                                            </Typography>
                                        )}

                                        <Typography  sx={{  color: '#454f5f', mt: {sm:1.5, xs:2} }}>
                                            Contact Us
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Menu>
                        </Box>
                        {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                        {/* <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none'
                            }}
                        >
                            LOGO
                        </Typography> */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, mx: 2, color: '#313131', display: 'block' }}>
                                    <Link
                                        style={{ textDecoration: 'none', color: '#313131' }}
                                        to={`/${page.replace(' ', '-').toLowerCase()}`}
                                    >
                                        {page}
                                    </Link>
                                </Button>
                            ))}

                            {!isLoggedIn ? (
                                <Button onClick={handleCloseNavMenu} sx={{ my: 2, mx: 2, color: '#313131', display: 'block' }}>
                                    <Link style={{ textDecoration: 'none', color: '#313131' }} to="/login">
                                        Login
                                    </Link>
                                </Button>
                            ) : (
                                ''
                            )}
                        </Box>
                    </Grid>

                    <Grid itme md={1} />
                    <Grid
                        item
                        md={3}
                        xs={12}
                        sx={{ display: {xs:'none',md:'flex'}, justifyContent: { md: 'end', xs: 'center' }, marginTop: { md: '15px' } }}
                    >
                        <Box sx={{ flexGrow: 0 }}>
                            {!isLoggedIn ? (
                                <Button variant="contained" sx={{ backgroundColor: '#1967D2', mr: 3 }}>
                                    <Link style={{ textDecoration: 'none', color: '#FFFFFF' }} to="/register">
                                        Signup
                                    </Link>
                                </Button>
                            ) : (
                                <Button variant="contained" sx={{ backgroundColor: '#1967D2', mr: 3 }}>
                                    <Link style={{ textDecoration: 'none', color: '#FFFFFF' }} to="/dashboard">
                                        Dashboard
                                    </Link>
                                </Button>
                            )}

                            <Button variant="outlined" sx={{ borderColor: '#1967D2', color: '#1967D2' }}>
                                Contact Us
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
