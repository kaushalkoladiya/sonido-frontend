import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Welcome = (props) => (
  <Grid
    container
    spacing={1}
    direction="column"
    justify="center"
    alignItems="center"
    alignContent="center"
    wrap="nowrap"
  >
    <Grid item xl={12} lg={12} sm={12} xs={12}>
      <Typography variant="h4" color="secondary">
        Welcome To Musico
      </Typography>
    </Grid>
    <Grid item sm={12} xs={12}>
      <Typography color="primary">Make friends and <code>dedicate</code> a song.</Typography>
    </Grid>
    <Grid item sm={12} xs={12}>
      <Typography variant="h5">FEEL Music!</Typography>
    </Grid>
  </Grid>
);

export default Welcome;
