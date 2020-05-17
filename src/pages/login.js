import React, { useState } from 'react';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

// API
import { login } from '../api';

import Logo from '../images/logo.png'

const style = {
  center: {
    textAlign: 'center',
    width: '100%',
    padding: '0 20px',
  },

};

const Login = ({ classes, ...rest }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const changeHandler = (event) => {
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  }
  
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = await login({ email: email, password: password });
    if (data.status && data.status === 400) {
      if (data.message && !data.errors) {
        setErrors({ genral: data.message });
      } else {
        setErrors({ ...data.errors });
      }
    } else {
      console.log(data);
      localStorage.setItem('token', `Bearer ${data.token}`);
      rest.history.push('/');
    }
    setLoading(false);
  }

  return (
    <Grid container>
      <Grid item sm={4}></Grid>
      <Grid item sm={4} className={classes.center}>
        <img src={Logo} alt="logo" />
        <Typography color="initial" variant="h3">Login</Typography>
        <br />
        <form noValidate onSubmit={submitHandler}>
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
          {errors.genral && <Typography variant="caption" color="error" >{errors.genral}</Typography>}
          <br />
          <br />
          <Button type="submit" color="primary" variant="contained" disabled={loading ? true : false}>
            Login{loading && <CircularProgress color="primary" style={{ marginLeft: 10 }} size={20} />}
          </Button>
        </form>
      </Grid>
      <Grid item sm={4}></Grid>
    </Grid>
  );

}

export default withStyles(style)(Login);