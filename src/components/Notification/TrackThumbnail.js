import React, { useState, Fragment } from 'react';

// MUI
import withStyle from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

// Icons
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseArrowIcon from '@material-ui/icons/Pause';

// Components
import TooltipButton from '../Button/TooltipButton';

const style = {
  controls: {
    display: 'flex',
    alignItems: 'center',
  },
  playIcon: {
    height: 30,
    width: 30,
  },
  card: {
    padding: 5,
  }
}

const TrackThumbnail = ({ classes, previewUrl, artistName, trackName }) => {
  const [play, setPlay] = useState(false);
  const [audio] = useState(new Audio());

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
    <Fragment>
      <Card variant="outlined" className={classes.card}>
        <Typography variant="h6" color="secondary">{trackName}</Typography>
        <Typography variant="body2">By {artistName}</Typography>
        <div className={classes.controls}>
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
      </Card>
    </Fragment>
  )
}

export default withStyle(style)(TrackThumbnail);