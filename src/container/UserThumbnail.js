import React, { Fragment } from 'react';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Components
import Thumbnail from '../components/User/Thumbnail';

const UserThumbnail = ({ users, noUsers, fromSearch, dedicateHandler }) => {
  const hasUsers = users.length > 0 ? true : false;
  return (
    <Grid container>
      {hasUsers ? (
        <Fragment>
          {users.map((user, key) =>
            <Thumbnail
              user={user}
              key={key}
              fromSearch={fromSearch ? true : false}
              dedicateHandler={dedicateHandler ? dedicateHandler : null}
            />)}
        </Fragment>
      ) : noUsers ? (
        <Typography>Not found</Typography>
      ) : (
            <Fragment><Typography>Nothing there!</Typography></Fragment>
          )}
    </Grid>
  )
}

export default UserThumbnail;