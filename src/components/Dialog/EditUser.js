import React, { Fragment, useState, useEffect } from 'react';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Icons
import EditIcon from '@material-ui/icons/Edit';
import CloseButton from '@material-ui/icons/Close';

// Components
import TooltipButton from '../Button/TooltipButton';

import { editUser, showUser } from '../../api';

const style = {
  center: {
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 5,
  }
}

const EditUser = ({ classes, track }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await showUser(localStorage.getItem('userId'));
      if(userData.status) {
        setErrors('Serve problem try again later');
      }
      const { name, bio, website, location } = userData;
      setName(name);
      setBio(bio);
      setWebsite(website);
      setLocation(location);
    }
    fetchData();
  }, [])

  const openHandler = () => {
    setOpen(true);
  }

  const closeHandler = () => {
    setOpen(false);
  }

  const changeHandler = (event) => {
    if (event.target.name === 'name') {
      setName(event.target.value);
    } else if (event.target.name === 'location') {
      setLocation(event.target.value);
    } else if (event.target.name === 'website') {
      setWebsite(event.target.value);
    } else if (event.target.name === 'bio') {
      setBio(event.target.value);
    }
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    await editUser(name, location, bio, website);
    setLoading(false);
    setOpen(false);
  }

  return (
    <Fragment>
      <TooltipButton placement="top" onClick={openHandler} title="Edit Profile">
        <EditIcon />
      </TooltipButton>
      <Dialog onClose={closeHandler} fullWidth open={open} maxWidth="sm">
        <TooltipButton onClick={closeHandler} title="Close" btnClass={classes.closeButton}>
          <CloseButton color="primary" />
        </TooltipButton>
        <DialogTitle className={classes.center}><Typography variant="h5">Edit Your Details</Typography></DialogTitle>
        <DialogContent className={classes.content}>
          <form noValidate onSubmit={submitHandler}>
            <TextField
              label="name"
              name="name"
              id="name"
              type="name"
              value={name}
              placeholder="Your Name"
              variant="outlined"
              fullWidth
              size="small"
              helperText={errors.name?.message}
              error={errors.name ? true : false}
              onChange={changeHandler}
            />
            <br />
            <br />
            <TextField
              label="location"
              name="location"
              id="location"
              type="text"
              value={location}
              placeholder="Your location"
              variant="outlined"
              fullWidth
              size="small"
              helperText={errors.location?.message}
              error={errors.location ? true : false}
              onChange={changeHandler}
            />
            <br />
            <br />
            <TextField
              label="Bio"
              name="bio"
              id="bio"
              type="text"
              value={bio}
              placeholder="About you"
              variant="outlined"
              fullWidth
              size="small"
              helperText={errors.bio?.message}
              error={errors.bio ? true : false}
              onChange={changeHandler}
            />
            <br />
            <br />
            <TextField
              label="Website"
              name="website"
              id="website"
              type="text"
              value={website}
              placeholder="Your website"
              variant="outlined"
              fullWidth
              size="small"
              helperText={errors.confirm_bio?.message}
              error={errors.confirm_bio ? true : false}
              onChange={changeHandler}
            />
            <br />
            {errors.genral && <Typography variant="caption" color="error" >{errors.genral}</Typography>}
            <br />
            <br />
            <Button type="submit" color="primary" variant="contained" disabled={loading ? true : false}>
              submit{loading && <CircularProgress color="primary" style={{ marginLeft: 10 }} size={20} />}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default withStyles(style)(EditUser);

