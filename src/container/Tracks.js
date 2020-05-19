import React, { Fragment } from 'react';

// MUI
import withStyle from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typograph from '@material-ui/core/Typography';

// components
import Track from '../components/Track/Track';

const style = {
  paper: {
    minHeight: 30,
    marginBottom: 20,
    padding: 10,
  }
}

const Tracks = ({ classes, tracks, fromHome }) => {
  const show = tracks.length > 0 ? true : false;
  return (
    <Fragment>
      {show ? (
        <Paper variant="outlined" className={classes.paper}>
          <Grid container spacing={2}>
            {tracks.map((track, key) =>
              <Track
                track={track}
                key={key}
                fromHome
              />
            )}
          </Grid>
        </Paper>

      ) : (
          <Paper variant="outlined" className={classes.paper}>
            <Typograph variant="h5">Your searches will be shown here.</Typograph>
          </Paper>
        )}
    </Fragment>
  );
}

export default withStyle(style)(Tracks);