import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import PersonIcon from '@mui/icons-material/Person';
import { Grid, useMediaQuery } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import Support from "./Support";
import MyOrder from "./MyOrder";
import MyDetails from "./MyDetails";
import Shop from "./Shop";
import Inbox from "./Inbox";
import PatientManagment from "./PatientManagment";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Badge from '@mui/material/Badge';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const drawerWidth = 300;

function ResponsiveDrawer(props) {

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const responsive = useMediaQuery("(max-width:1200px)");
    const [isOpened, setIsOpened] = React.useState(responsive);
    const [sidebarDocked, setSidebarDocked] = React.useState(true);
    const menuList = [
        {
            icon: <InboxIcon />,
            title: "My Order",
            navLink: "/my-order",
            component: <MyOrder />
        },
        {
            icon: <ShoppingBagIcon />,
            title: "Shop",
            navLink: "/shop",
            component: <Shop />
        },
        {
            icon: <MoveToInboxIcon />,
            title: "Inbox",
            navLink: "/inbox",
            component: <Inbox />
        },
        {
            icon: <PeopleOutlineIcon />,
            title: "Patient Management",
            navLink: "/patient",
            component: <PatientManagment />
        },
        {
            icon: <ContactSupportIcon />,
            title: "Support",
            navLink: "/support",
            component: <Support />
        },
        {
            icon: <PersonIcon />,
            title: "My Details",
            navLink: "/my-details",
            component: <MyDetails />
        },
    ];

    const setSidebarOpen = () => {
        setSidebarDocked((prevState) => !prevState);
    };
    React.useEffect(() => {
        if (responsive) {
            setIsOpened(false);
            setSidebarDocked(false);
        } else {
            setIsOpened(true);
            setSidebarDocked(true);
        }
    }, [responsive]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClicks = (event) => {
        setAnchorEl(event.currentTarget);
        console.log('clicked')
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const drawer = (
        <div className='drawer'>
            <Toolbar />
            <Grid
                container
                flexDirection='column'
                alignItems="center"
                justifyContent='center'
                width="auto"
                mt={2}
                gap={3}
            >
                <Link to="/">
                    <img src='assets/images/logo.png' alt="admin" width="120px" />
                </Link>
                <Typography
                    variant="p"
                    fontWeight="800"
                    color="white"
                    fontSize='20px'
                >
                    DENTAL CARE
                </Typography>
            </Grid>
            <List sx={{ position: "relative", top: "50px" }}>
                {menuList.map((list) => {
                    return (
                        <React.Fragment key={list.title}>
                            <NavLink
                                to={list.navLink}
                                className={({ isActive }) =>
                                    isActive ? "activelink" : "menulink"
                                }
                            >
                                <ListItem style={{ padding: '15px 0' }}>
                                    <ListItemButton className='buttons' disableRipple>
                                        <ListItemIcon className='icons' sx={{
                                            minWidth: '40px', minHeight: '35px', marginLeft: '10px',
                                            clipPath: 'polygon(50% 0%, 90% 25%, 90% 75%, 50% 100%, 10% 75%, 10% 25%)'
                                        }}>
                                            {list.icon}
                                        </ListItemIcon>
                                        <ListItemText disableTypography sx={{ fontWeight: '500', fontSize: '18.2px' }} primary={list.title} />
                                    </ListItemButton>
                                </ListItem>
                            </NavLink>
                        </React.Fragment>
                    );
                })}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
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
                    <Typography className='homeLogo'><img src='assets/images/order1.png' /></Typography>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                        className='headerTitle'
                    >
                        {/* {props.name} */}
                        Product Details
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
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClicks}
                            >
                                <ArrowDropDownIcon />
                            </Button>
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
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                {/* <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                    enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                    imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                    Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                    nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                    leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                    feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                    consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                    eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                    neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                    tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                    tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                    gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                    et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                    eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                    posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography> */}
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    window: PropTypes.func,
};

export default ResponsiveDrawer;
