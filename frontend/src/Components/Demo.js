import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "react-sidebar";
import InboxIcon from '@mui/icons-material/Inbox';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from "@mui/icons-material/Menu";
import {
    ListItem,
    ListItemIcon,
    List,
    ListItemText,
    ListItemButton,
    Typography,
    Grid,
    useMediaQuery,
    IconButton,
} from "@mui/material";
// import face from "../../../assets/images/Group.png";
import { Link, NavLink } from "react-router-dom";

const Demo = (props) => {
    const responsive = useMediaQuery("(max-width:1200px)");
    const [isOpened, setIsOpened] = useState(responsive);
    const [sidebarDocked, setSidebarDocked] = useState(true);
    const menuList = [
        {
            icon: <InboxIcon />,
            title: "My Order",
            navLink: "/my-order",
        },
        {
            icon: <ShoppingBagIcon />,
            title: "Shop",
            navLink: "/shop",
        },
        {
            icon: <MoveToInboxIcon />,
            title: "Inbox",
            navLink: "/inbox",
        },
        {
            icon: <PeopleOutlineIcon />,
            title: "Patient Management",
            navLink: "/patient",
        },
        {
            icon: <ContactSupportIcon />,
            title: "Support",
            navLink: "/support",
        },
        {
            icon: <PersonIcon />,
            title: "My Details",
            navLink: "/my-details",
        },
    ];

    const setSidebarOpen = () => {
        setSidebarDocked((prevState) => !prevState);
    };
    useEffect(() => {
        if (responsive) {
            setIsOpened(false);
            setSidebarDocked(false);
        } else {
            setIsOpened(true);
            setSidebarDocked(true);
        }
    }, [responsive]);

    return (
        <>
            <Sidebar
                sidebar={
                    <>
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
                                    <Fragment key={list.title}>
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
                                                    <ListItemText disableTypography sx={{ fontWeight: '500', fontSize: '21.2px' }} primary={list.title} />
                                                </ListItemButton>
                                            </ListItem>
                                        </NavLink>
                                    </Fragment>
                                );
                            })}
                        </List>
                    </>
                }
                onSetOpen={setSidebarOpen}
                open={sidebarDocked}
                docked={isOpened}
                touch={false}
                styles={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0)",
                    },
                    sidebar: {
                        position: "fixed",
                        background: "rgba(0, 69, 116, 1)",
                        display: "flex",
                        gap: "10px",
                        zIndex: '99',
                        flexDirection: "column",
                        width: "300px",
                    },
                }}
            >
                {responsive && (
                    <IconButton
                        sx={{ padding: "40px 0 0 40px" }}
                        variant="text"
                        onClick={setSidebarOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                {props.children}
            </Sidebar >
        </>
    );
};

export default Demo;
