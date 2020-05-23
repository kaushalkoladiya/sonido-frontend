import React, { Fragment, useState, useEffect } from 'react';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

// Icons
import CloseIcon from '@material-ui/icons/Close';

// Components 
import TooltipButton from '../Button/TooltipButton';
import User from '../User/Thumbnail';

import { following } from '../../api';

const style = {
  center: {
    textAlign: 'center',
  },
  CloseIcon: {
    position: 'absolute',
    right: 10,
    top: 5,
  }
}

const Follower = ({ classes, track }) => {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState('');
  const [followings, setFollowings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await following();
      if (data.status) {
        setErrors(data.message);
        return;
      }
      setFollowings(data);
      setLoading(false);
    }
    fetchData();
  }, [open]);

  const openHandler = () => {
    setOpen(true);
  }

  const closeHandler = () => {
    setOpen(false);
  }

  return (
    <Fragment>
      <Button variant="text" color="secondary" onClick={openHandler}>Following</Button>
      <Dialog onClose={closeHandler} fullWidth open={open} maxWidth="sm">
        <TooltipButton onClick={closeHandler} title="Close" btnClass={classes.CloseIcon}>
          <CloseIcon color="primary" />
        </TooltipButton>
        <DialogTitle className={classes.center}> <Typography variant="h4">Your Followings</Typography></DialogTitle>
        <DialogContent className={classes.content}>
          {loading ? (
            <div style={{ margin: '50px auto 50px auto', textAlign: 'center' }}>
              <CircularProgress value={10} variant="indeterminate" color="secondary" />
            </div>
          ) : errors ? (
            <Fragment>
              <Typography variant="body2" className={classes.center}>{errors}</Typography>
            </Fragment>
          ) : (
                <Grid container spacing={2}>
                  {followings.map((fwr, key) => <User fromFollow user={fwr.to} key={key} />)}
                </Grid>
              )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default withStyles(style)(Follower);

