import React, { useState } from 'react';

// MUI
import withStyle from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Icons
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseArrowIcon from '@material-ui/icons/Pause';

// Components
import TooltipButton from '../Button/TooltipButton';
import DedicateDialog from '../Dialog/Dedicate';

const style = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 150,
    height: 150,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
  },
  playIcon: {
    height: 30,
    width: 30,
  },
}

const Track = ({ classes, track, fromHome }) => {
  const [play, setPlay] = useState(false);
  const [audio] = useState(new Audio());

  const { previewUrl, artworkUrl100, trackName, artistName } = track;

  const playHandler = async () => {
    audio.src = previewUrl;
    await audio.play();
    setPlay(true);
  }

  const pauseHandler = () => {
    audio.pause();
    setPlay(false);
  }

  return (
    <Grid item xl={3} lg={4} sm={6} xs={12}>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {trackName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {artistName}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            {fromHome &&
              <DedicateDialog
                track={track}
              />
              }
            {play ? (
              <TooltipButton onClick={pauseHandler} title="Pause" placement="top">
                <PauseArrowIcon className={classes.playIcon} color="primary" />
              </TooltipButton>
            ) : (
                <TooltipButton onClick={playHandler} title="Play" placement="top">
                  <PlayArrowIcon className={classes.playIcon} color="primary" />
                </TooltipButton>
              )}
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image={artworkUrl100}
          title={artistName}
        />
      </Card>
    </Grid>
  )
}

export default withStyle(style)(Track);