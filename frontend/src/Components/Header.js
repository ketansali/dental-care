import React from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Badge from '@mui/material/Badge';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';

const drawerWidth = 300;

const Header = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClicks = (event) => {
        setAnchorEl(event.currentTarget);
        console.log('clicked')
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <AppBar
                    className='appBar'
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                    }}
                >
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 2 }}
                        >
                            <img src='assets/images/Polygon.png' />
                        </IconButton>
                        <Typography className='homeLogo'><img src={props.src} /></Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                            className='headerTitle'
                        >
                            {props.name}
                        </Typography>

                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { md: 'flex' } }}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={1} color="error">
                                    <NotificationsNoneOutlinedIcon />
                                </Badge>
                            </IconButton>
                            <IconButton className='pofileImage'>
                                <img src='assets/images/profileheader.png' />
                            </IconButton>
                            <IconButton className='pofileImage'>
                                {/* <Button> */}
                                <ArrowDropDownIcon
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClicks}
                                />
                                {/* </Button> */}
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                    <NavLink to='/' className='linkItem'><MenuItem onClick={handleClose}>Logout</MenuItem></NavLink>
                                </Menu>
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Header