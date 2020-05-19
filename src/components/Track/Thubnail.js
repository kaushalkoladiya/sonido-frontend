import React from 'react';

// MUI
import withStyle from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const style = {
  card: {
    padding: 5,
  }
}

const TrackThumbnail = ({ classes, track }) => {
  const { trackName, artistName } = track;

  return (
    <Grid item sm={5}>
      <Card variant="outlined" className={classes.card}>
        <Typography variant="h6" color="secondary">{trackName}</Typography>
        <Typography variant="body2">By {artistName}</Typography>
      </Card>
    </Grid>
  )
}

export default withStyle(style)(TrackThumbnail);