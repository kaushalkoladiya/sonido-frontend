import React, { useState } from 'react';

// MUI
import withStyle from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';

// Icons
import AccountCircle from '@material-ui/icons/SearchTwoTone';

const style = {
  center: {
    textAlign: 'center',
  },
  searchBox: {
    padding: 20,
  },

};

const SearchBox = ({ classes, searchHandler, title }) => {
  const [term, setTerm] = useState('');

  const changeHandler = (event) => {
    setTerm(event.target.value);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    searchHandler(term);
  }


  return (
    <Grid container spacing={2} alignItems="center" className={classes.searchBox}>
      <Grid item sm={11} xs={12}>
        <TextField
          id="input"
          name="input"
          label={title}
          value={term}
          onChange={changeHandler}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item sm={1} xs={12}>
        <Button variant="outlined" fullWidth onClick={submitHandler}>Search</Button>
      </Grid>
    </Grid>
  )
}

export default withStyle(style)(SearchBox);