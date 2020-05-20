import React, { Fragment } from 'react';

// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Components
import Dedicate from '../components/Dedicate/Dedicate';

const SendedDedication = ({ sendedDedications, noSendedDedications }) => {
  const hasDedications = sendedDedications.length > 0 ? true : false;
  return (
    <Fragment>
      <Typography color="secondary" variant="h6">Sended Dedications</Typography>
      {hasDedications ? (
        <Grid container>
          {sendedDedications.map((dedication, key) =>{
            const { previewUrl, artworkUrl, createdAt, artistName, receiver: { username, _id, name }, trackName } = dedication;
            dedication={
              previewUrl,
              artworkUrl, 
              createdAt, 
              artistName, 
              trackName,
              userData:{
                username, _id, name
              }
            };
            
            return(
            <Grid item sm={12}>
              <Dedicate data={dedication} key={key} />
            </Grid>
            );
          }
          )}
        </Grid>
      ) : noSendedDedications ? (
        <h1>You didn't dedicate asong to anyone yet!</h1>
      ): (
        <h5>Loading...</h5>
        )}
    </Fragment>
  );
}

export default SendedDedication;