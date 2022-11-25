import React from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Badge from '@mui/material/Badge';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import {useJwt} from 'react-jwt'
import { useSelector } from 'react-redux';
const WelComeUserName = () => {
    const auth =  useSelector(state=>state.auth)
    const user = useJwt(auth.token)
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar className='appBar'>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            sx={{ mr: 2 }}
                        >
                            <img src='assets/images/Polygon.png' />
                        </IconButton>
                        <Typography className='homeLogo'><img src='assets/images/welcome.png' /></Typography>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                            className='headerTitle'
                        >
                            Welcome {user?.decodedToken?.userData?.firstName} !
                        </Typography>

                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="error">
                                    <NotificationsNoneOutlinedIcon />
                                </Badge>
                            </IconButton>
                            <IconButton className='pofileImage'>
                                <img src='assets/images/profileheader.png' />
                            </IconButton>
                            <IconButton className='pofileImage'>
                                <ArrowDropDownIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box >
            <div className='main-content'>
                <div className='myAccount'>
                    <p>My Account</p>
                </div>
                <div className='welcome-content'>
                    <Grid container spacing={3} sx={{ padding: '50px' }}>
                        <Grid item xs={12} sm={4} display="flex" alignItems="center" flexDirection="column">
                            <Link to="/my-order" style={{ textDecoration: 'none' }}>
                                <div className="poly1">
                                    <img src='assets/images/Polygon 2.png' alt="img" className='poly-img' width="auto" height="auto" />
                                    <p style={{ position: 'absolute' }} className='order'><img src='assets/images/order.png' alt="img" className='icon-img' /></p>
                                </div>
                                <div className="poly2">
                                    <img src="assets/images/boat.png" alt="img" className='poly-img1' width="auto" height="auto" />
                                    <p className='ac-p'>My Order</p>
                                </div>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={4} display="flex" alignItems="center" flexDirection="column">
                            <Link to="/shop" style={{ textDecoration: 'none' }}>
                                <div className="poly1">
                                    <img src='assets/images/Polygon 2.png' alt="img" className='poly-img' width="auto" height="auto" />
                                    <p style={{ position: 'absolute' }} className='shop'><img src='assets/images/shop.png' alt="img" className='icon-img' /></p>
                                </div>
                                <div className="poly2">
                                    <img src="assets/images/boat.png" alt="img" className='poly-img1' width="auto" height="auto" />
                                    <p className='ac-p'>Shop</p>
                                </div>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={4} display="flex" alignItems="center" flexDirection="column">
                            <Link to="/inbox" style={{ textDecoration: 'none' }}>
                                <div className="poly1">
                                    <img src='assets/images/Polygon 2.png' alt="img" className='poly-img' width="auto" height="auto" />
                                    <p style={{ position: 'absolute' }} className='inbox'><img src='assets/images/inbox.png' alt="img" className='icon-img' /></p>
                                </div>
                                <div className="poly2">
                                    <img src="assets/images/boat.png" alt="img" className='poly-img1' width="auto" height="auto" />
                                    <p className='ac-p'>Inbox</p>
                                </div>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={4} display="flex" alignItems="center" flexDirection="column">
                            <Link to="/patient" style={{ textDecoration: 'none' }}>
                                <div className="poly1">
                                    <img src='assets/images/Polygon 2.png' alt="img" className='poly-img' width="auto" height="auto" />
                                    <p style={{ position: 'absolute' }} className='patient'><img src='assets/images/patient.png' alt="img" className='icon-img' /></p>
                                </div>
                                <div className="poly2">
                                    <img src="assets/images/boat.png" alt="img" className='poly-img1' width="auto" height="auto" />
                                    <p className='ac-p'>Patient Management</p>
                                </div>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={4} display="flex" alignItems="center" flexDirection="column">
                            <Link to="/support" style={{ textDecoration: 'none' }}>
                                <div className="poly1">
                                    <img src='assets/images/Polygon 2.png' alt="img" className='poly-img' width="auto" height="auto" />
                                    <p style={{ position: 'absolute' }} className='support'><img src='assets/images/support.png' alt="img" className='icon-img' /></p>
                                </div>
                                <div className="poly2">
                                    <img src="assets/images/boat.png" alt="img" className='poly-img1' width="auto" height="auto" />
                                    <p className='ac-p'>Support</p>
                                </div>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={4} display="flex" alignItems="center" flexDirection="column">
                            <Link to="/my-details" style={{ textDecoration: 'none' }}>
                                <div className="poly1">
                                    <img src='assets/images/Polygon 2.png' alt="img" className='poly-img' width="auto" height="auto" />
                                    <p style={{ position: 'absolute' }} className='details'><img src='assets/images/details.png' alt="img" className='icon-img' /></p>
                                </div>
                                <div className="poly2">
                                    <img src="assets/images/boat.png" alt="img" className='poly-img1' width="auto" height="auto" />
                                    <p className='ac-p'>My Details</p>
                                </div>
                            </Link>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    )
}

export default WelComeUserName
