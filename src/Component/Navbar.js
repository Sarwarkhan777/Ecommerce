import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import '../CSS/Navbar.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import UserContext from '../Component/context/UserContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';

function Navbar() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { logedUser } = useContext(UserContext);
    const { cart } = useContext(UserContext);


    const user = logedUser ? logedUser.charAt(0).toUpperCase() + logedUser.slice(1) : '';

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const { setUser } = useContext(UserContext);
    const [search, setsearch] = useState(null);
    const onInputChange = (e) => {
        const inputValue = e.target.value;
        setsearch(inputValue);
        setUser(inputValue);
        console.log(search);
    };


    let appname = "kharidikaro";
    return (
        <div className='nav-container'>
            <h1 className='logo' >
                {appname.toUpperCase()}
            </h1>
            <div className='navbar'>
                <ul className='nav-list'>
                    <NavLink to='/welcome' style={{ textDecoration: 'none' }}>
                        <li className='nav-item' >
                            Home
                        </li>
                    </NavLink>
                    <NavLink to='/products' style={{ textDecoration: 'none' }}>
                        <li className='nav-item' >
                            Products
                        </li>
                    </NavLink>
                    <NavLink to='/addminlogin' style={{ textDecoration: 'none' }}>
                        <li className='nav-item' >
                            Add Products
                        </li>
                    </NavLink>
                    <NavLink to='/editadminlogin' style={{ textDecoration: 'none' }}>
                        <li className='nav-item' >
                            Eidt/Delete Products
                        </li>
                    </NavLink>
                    <li className='nav-item'>
                        <Box
                            component='form'
                            sx={{
                                '& > :not(style)': {
                                    width: '20ch',
                                    margin: "-5px",
                                },
                            }}
                            noValidate
                            autoComplete='off'
                        >
                            <TextField
                                id='standard-basic'
                                label='Search'
                                variant='outlined'
                                size='small'
                                style={{ fontFamily: "sans-serif" }}
                                onChange={onInputChange}
                            />
                        </Box>
                    </li>
                    <div className='profile'>
                        <li className='nav-item '>
                            <NavLink to="/cart" style={{ textDecoration: 'none' }}>
                                <Badge badgeContent={cart} color="error">
                                    <ShoppingCartIcon sx={{ fontSize: 35 }} />
                                </Badge>
                            </NavLink>
                        </li>
                    </div>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings" style={{ top: '8px', right: "15px" }}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt={user} src="/static/images/avatar/2.jpg" />
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
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">{user}</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <NavLink to="/login" style={{ textDecoration: 'none' }}>
                                    <Typography textAlign="center">Logout</Typography>
                                </NavLink>
                            </MenuItem>

                        </Menu>
                    </Box>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;
