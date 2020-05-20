import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

// MUI
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Pages
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import HomePage from './pages/home';

import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#482880',
      main: '#673ab7',
      dark: '#8561c5',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffa733',
      main: '#ff9100',
      dark: '#b26500',
      contrastText: '#000',
    },
  },
});

axios.defaults.headers['Content-Type'] = 'application/json';

class App extends Component {
  render() {

    let route = (
      <Switch>
        <Route
          path="/login"
          exact
          component={(props) =>
            <LoginPage
              {...props}
            />
          }
        />
        <Route
          path="/signup"
          exact
          component={(props) =>
            <SignupPage
              {...props}
            />
          }
        />
         <Route
            path="/"
            exact
            component={props =>
              <HomePage
                {...props}
              />}
          />
      </Switch>
    );

    // if (this.state.isAuth) {
    //   route = (
    //     <Switch>
         
    //     </Switch>
    //   )
    // }

    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <div className='container'>
            {route}
          </div>
        </BrowserRouter>
      </MuiThemeProvider >
    );
  }
}

export default App;
