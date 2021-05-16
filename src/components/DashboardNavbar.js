import { AppBar, Badge, Box, IconButton, Toolbar } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
// import Logo from './Logo';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
    const [notifications] = useState([]);
    const { onLogout } = useAuthContext();
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/access-wallet');
    };

    return (
        <AppBar elevation={0} {...rest}>
            <Toolbar>
                <RouterLink to='/'>{/* <Logo /> */}</RouterLink>
                <Box sx={{ flexGrow: 1 }} />
                {/* <Hidden lgDown> */}
                <IconButton color='inherit'>
                    <Badge badgeContent={notifications.length} color='primary' variant='dot'>
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <IconButton color='inherit' onClick={handleLogout}>
                    <InputIcon />
                </IconButton>
                {/* </Hidden> */}
                {/* <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden> */}
            </Toolbar>
        </AppBar>
    );
};

DashboardNavbar.propTypes = {
    onMobileNavOpen: PropTypes.func,
};

export default DashboardNavbar;
