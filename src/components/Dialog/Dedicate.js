import React, { Fragment, useState } from 'react';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/LinearProgress';

// Icons
import LooksIcon from '@material-ui/icons/Looks';
import CloseButton from '@material-ui/icons/Close';

// Components
import TooltipButton from '../Button/TooltipButton';
import SearchBox from '../SearchBox/SearchBox';
import TrackThumbnail from '../Track/Thubnail';

// Containers
import UserThumbnailContainer from '../../container/UserThumbnail';

// API
import { searchUsers, dedicateSong } from '../../api';

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

const Dedicate = ({ classes, track }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [noUsers, setNoUsers] = useState(false);

  const { previewUrl, artworkUrl100, trackName, artistName } = track;

  const openHandler = () => {
    setOpen(true);
  }

  const closeHandler = () => {
    setOpen(false);
    setUsers([]);
  }

  const getUserHandler = async (term) => {
    setLoading(true);
    const usersData = await searchUsers(term);
    usersData.length === 0 && setNoUsers(true);
    setUsers(usersData);
    setLoading(false);
  }

  const dedicateHandler = async (receiverId) => {
    setLoading(true);
    await dedicateSong(receiverId, previewUrl, artworkUrl100, trackName, artistName);
    setLoading(false);
  }

  return (
    <Fragment>
      <TooltipButton placement="top" onClick={openHandler} title="Dedicate">
        <LooksIcon color="primary" />
      </TooltipButton>
      <Dialog onClose={closeHandler} fullWidth open={open} maxWidth="sm">
        <TooltipButton onClick={closeHandler} title="Close" btnClass={classes.closeButton}>
          <CloseButton color="primary" />
        </TooltipButton>
        <DialogTitle className={classes.center}><Typography variant="h5">Dedicate this song to your friend!</Typography></DialogTitle>
        <DialogContent className={classes.content}>
          <Grid container>
            <TrackThumbnail
              track={track}
            />
            <Grid item sm={6} xs={12}>
              <SearchBox
                searchHandler={getUserHandler}
                title="Search for your friends..."
              />
            </Grid>
          </Grid>
          {loading && <CircularProgress variant="query" style={{ position: 'inherit' }} color="secondary" />}
          <UserThumbnailContainer
            users={users}
            noUsers={noUsers}
            fromSearch
            dedicateHandler={dedicateHandler}
          />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default withStyles(style)(Dedicate);