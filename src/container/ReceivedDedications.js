import React, { Fragment } from 'react';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Components
import Dedicate from '../components/Dedicate/Dedicate';

const SendedDedication = ({ receivedDedications, noReceivedDedications }) => {
  const hasDedications = receivedDedications.length > 0 ? true : false;
  return (
    <Fragment>
      <Typography color="secondary" variant="h6">Received Dedications</Typography>
      {hasDedications ? (
        <Grid container>
          {receivedDedications.map((dedication, key) =>{
            const { previewUrl, artworkUrl, createdAt, artistName, sender: { username, _id, name }, trackName }=dedication;
            dedication={
              previewUrl,
              artworkUrl, 
              createdAt, 
              artistName, 
              trackName,
              userData:{
                username:username,
                 _id:_id,
                  name:name
              }
            }
            return(
            <Grid item sm={12}>
              <Dedicate data={dedication} key={key} />
            </Grid>
            );
          }
          )}
        </Grid>
      ) : noReceivedDedications ? (
        <h1>You didn't dedicate asong to anyone yet!</h1>
      ): (
        <h5>Loading...</h5>
        )}
    </Fragment>
  );
}

export default SendedDedication;