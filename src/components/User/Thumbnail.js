import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// MUI
import withStyle from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

const style = {
  thumbnail: {
    marginBottom: 10,
  },
  contentBetween: {
    justifyContent: 'space-between',
  }
}

const Thumbnail = ({ classes, user: { _id, username, name }, fromSearch, dedicateHandler }) => {
  return (
    <Fragment>
      {fromSearch ? (
        <Grid item lg={12} sm={12} xs={12} className={classes.thumbnail} >
          <Grid container spacing={2} className={classes.contentBetween}>
            <Grid item component={Link} to={`/${_id}`}>
              <Avatar>{username.substr(0, 1)}</Avatar>
            </Grid>
            <Grid item>
              <Tooltip title={username} placement="top">
                <Typography variant="body2" component={Link} to={`/${_id}`}>@{username}</Typography>
              </Tooltip>
              <br />
              {name && <Typography variant="caption">{name}</Typography>}
            </Grid>
            <Grid item>
              <Tooltip placement="top" title="Send Dedication">
                <Button variant="outlined" onClick={()=>dedicateHandler(_id)}>Dedicate</Button>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      ) : (
          <Grid item sm={3} xs={6} className={classes.thumbnail} >
            <Grid container spacing={2}>
              <Grid item component={Link} to={`/${_id}`}>
                <Avatar>{username.substr(0, 1)}</Avatar>
              </Grid>
              <Grid item>
                <Tooltip title={username} placement="top">
                  <Typography variant="body2" component={Link} to={`/${_id}`}>@{username}</Typography>
                </Tooltip>
                <br />
                {name && <Typography variant="caption">{name}</Typography>}
              </Grid>
            </Grid>
          </Grid>
        )}
    </Fragment >
  )
}

export default withStyle(style)(Thumbnail);