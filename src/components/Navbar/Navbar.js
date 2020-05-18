import React from 'react';
import { NavLink } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const Navbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar style={{margin:"auto"}}>
        <Button color="inherit" component={NavLink} to="/login" >Login</Button>
        <Button color="inherit" component={NavLink} to="/" >Home</Button>
        <Button color="inherit" component={NavLink} to="/signup" >Signup</Button>
      </Toolbar>
    </AppBar>
  )
};

export default Navbar;