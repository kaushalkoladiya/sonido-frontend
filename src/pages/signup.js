import React, { useState } from "react";
import { Link } from "react-router-dom";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

// Icons
import HomeIcon from "@material-ui/icons/AssignmentReturn";

// API
import { singup } from "../api";

import Logo from "../images/logo.png";
import TooltipButton from "../components/Button/TooltipButton";

const style = {
  center: {
    textAlign: "center",
    width: "100%",
    padding: "0 20px",
  },
};

const Signup = ({ classes, ...rest }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const changeHandler = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    } else if (event.target.name === "username") {
      setUsername(event.target.value);
    } else if (event.target.name === "confirmPassword") {
      setConfirmPassword(event.target.value);
    } else if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = await singup({
      email: email,
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    });
    if (data.status && data.status === 400) {
      if (data.message && !data.errors) {
        setErrors({ genral: data.message });
      } else {
        setErrors({ ...data.errors });
      }
    } else {
      const remainSecond = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainSecond);
      localStorage.setItem("expiryDate", expiryDate);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("token", `Bearer ${data.token}`);
      rest.history.push("/");
    }
    setLoading(false);
  };

  return (
    <Grid container>
      <Grid item sm={4}>
        <Typography>Return Home</Typography>
        <Link to="/">
          <TooltipButton title="Return Home">
            <HomeIcon color="secondary" />
          </TooltipButton>
        </Link>
      </Grid>
      <Grid item sm={4} className={classes.center}>
        <img src={Logo} alt="logo" />
        <Typography color="initial" variant="h3">
          Signup
        </Typography>
        <br />
        <form noValidate onSubmit={submitHandler}>
          <TextField
            label="Username"
            name="username"
            id="username"
            type="username"
            value={username}
            placeholder="Pick Username"
            variant="outlined"
            fullWidth
            size="small"
            helperText={errors.username?.message}
            error={errors.username ? true : false}
            onChange={changeHandler}
          />
          <br />
          <br />
          <TextField
            label="Email"
            name="email"
            id="email"
            type="email"
            value={email}
            placeholder="Your E-Mail"
            variant="outlined"
            fullWidth
            size="small"
            helperText={errors.email?.message}
            error={errors.email ? true : false}
            onChange={changeHandler}
          />
          <br />
          <br />
          <TextField
            label="Password"
            name="password"
            id="password"
            type="password"
            value={password}
            placeholder="Your Password"
            variant="outlined"
            fullWidth
            size="small"
            helperText={errors.password?.message}
            error={errors.password ? true : false}
            onChange={changeHandler}
          />
          <br />
          <br />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            placeholder="Confirm Your Password"
            variant="outlined"
            fullWidth
            size="small"
            helperText={errors.confirm_password?.message}
            error={errors.confirm_password ? true : false}
            onChange={changeHandler}
          />
          <br />
          {errors.genral && (
            <Typography variant="caption" color="error">
              {errors.genral}
            </Typography>
          )}
          <br />
          <br />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={loading ? true : false}
          >
            Signup
            {loading && (
              <CircularProgress
                color="primary"
                style={{ marginLeft: 10 }}
                size={20}
              />
            )}
          </Button>
        </form>
        <br />
        <small>
          Don't have account? Login <Link to="/login">here</Link>
        </small>
      </Grid>
      <Grid item sm={4}></Grid>
    </Grid>
  );
};

export default withStyles(style)(Signup);
