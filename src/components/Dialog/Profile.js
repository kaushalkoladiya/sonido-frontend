import React, { Fragment, useState, useEffect } from 'react';
import Moment from 'react-moment';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';

// Icons
import AccountIcon from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
import LocationIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

// Components
import TooltipButton from '../Button/TooltipButton';
import Follower from './Follower';
import Following from './Following';

import { showUser } from '../../api';

const style = {
  center: {
    textAlign: 'center',
  },
  CloseIcon: {
    position: 'absolute',
    right: 10,
    top: 5,
  },
  flex: {
    display: 'flex'
  },
  username: {
    cursor: 'pointer',
    display: 'inline'
  }
}

const Profile = ({ classes, track }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await showUser(localStorage.getItem('userId'));
      if (data.status) {
        setErrors(data.message);
      }
      const { username, createdAt, name, bio, website, location } = data?.user;
      setUsername(username);
      setCreatedAt(createdAt);
      setName(name);
      setBio(bio);
      setWebsite(website);
      setLocation(location);
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
      <TooltipButton placement="top" onClick={openHandler} title="Your Profile">
        <AccountIcon />
      </TooltipButton>
      <Dialog onClose={closeHandler} fullWidth open={open} maxWidth="sm">
        <TooltipButton onClick={closeHandler} title="Close" btnClass={classes.CloseIcon}>
          <CloseIcon color="primary" />
        </TooltipButton>
        <DialogTitle className={classes.center}> <Typography variant="h3">{username}</Typography></DialogTitle>
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
                <Fragment>
                  <Follower />
                 <Following />
                  {/* </div> */}
                  {name && <Typography variant="h6">{name}</Typography>}
                  {bio && <div>
                    <Typography variant="body2">{bio}</Typography>
                    <br />
                  </div>}
                  {website && (
                    <div style={{ display: "flex" }}>
                      <LinkIcon color="primary" /> <a target="_blank" href={website} rel="noopener noreferrer">{website}</a>
                      <br />
                    </div>
                  )}
                  {location && (
                    <div style={{ display: "flex" }}>
                      <LocationIcon color="primary" /> <span>{location}</span>
                      <br />
                    </div>
                  )}
                  <div style={{ display: "flex" }}>
                    <CalendarTodayIcon color="primary" />{' '}<span>Joined on <Moment format="YYYY, MMM" date={createdAt} /></span>
                  </div>
                </Fragment>
              )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default withStyles(style)(Profile);

