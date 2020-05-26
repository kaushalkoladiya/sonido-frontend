import React, { Fragment } from "react";
import { NavLink, Link } from "react-router-dom";

// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// Icons
import HomeIcon from "@material-ui/icons/Home";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

// Components
import TooltipButton from "../Button/TooltipButton";
import Notifications from "../Dialog/Notification";
import EditUser from "../Dialog/EditUser";
import Profile from "../Dialog/Profile";

const Navbar = ({ isAuth, notifications, logout }) => {
  return (
    <AppBar position="fixed">
      <Toolbar style={{ margin: "auto" }}>
        {isAuth ? (
          <Fragment>
            <Link to="/">
              <TooltipButton title="Home">
                <HomeIcon />
              </TooltipButton>
            </Link>
            <Notifications notifications={notifications} />
            <EditUser />
            <Profile />
            <TooltipButton title="Logout" placement="top" onClick={logout}>
              <KeyboardReturn />
            </TooltipButton>
          </Fragment>
        ) : (
          <Fragment>
            <Button color="inherit" component={NavLink} to="/login">
              Login
            </Button>
            <Button color="inherit" component={NavLink} to="/">
              Home
            </Button>
            <Button color="inherit" component={NavLink} to="/signup">
              Signup
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
