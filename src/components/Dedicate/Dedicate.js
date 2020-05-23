import React from 'react';
import Moment from 'react-moment';

// MUI
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';

import User from '../Dialog/User';

// Components
import Track from '../Track/Track';

const style = {
  card: {
    marginBottom: 20,
    position: 'relative',
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  },
  image: {
    minWidth: 110,
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
};

const DedicationThumbnail = ({ classes, data: { previewUrl, artworkUrl, createdAt, artistName, userData: { username, _id, name }, trackName } }) => {
  const track = {
    artworkUrl100: artworkUrl,
    previewUrl,
    artistName,
    trackName
  };
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar>{username.substr(0, 1)}</Avatar>}
        title={
          <User username={username} id={_id} fromDedication />
          // <Typography color="primary" component={Link} to={`/${_id}`}>{username}</Typography>
        }
        subheader={<Moment format="MMM DD, YYYY" date={createdAt} />}
      />
      <CardContent>
        <Track
          track={track}
        />

      </CardContent>
    </Card>
  );
}

export default withStyles(style)(DedicationThumbnail);