import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

// MUI
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


// Pages
import LoginPage from './pages/login';
import SignupPage from './pages/signup';

// Components
import Navbar from './components/Navbar/Navbar';


import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

axios.defaults.headers = {
  'Content-Type': 'application/json'
};

class App extends Component {

  state = {
    isAuth: false,
  }

  render() {

    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
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
            </Switch>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
