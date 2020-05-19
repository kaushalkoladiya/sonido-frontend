import React, { Fragment, Component } from 'react';
import axios from 'axios';

// MUI
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// Components
import Navbar from '../components/Navbar/Navbar';
import SearchBox from '../components/SearchBox/SearchBox';
import Dedicate from '../components/Dedicate/Dedicate';

// Containers
import UserThumbnailContainer from '../container/UserThumbnail';
import Tracks from '../container/Tracks';

// API
import { getTracks, home } from '../api';

class Home extends Component {
  state = {
    isAuth: false,
    users: [],
    sendedDedications: [],
    receivedDedications: [],
    notifications: [],
    tracks: [],
    noUsers: false,
    noSendedDedications: false,
    noReceivedDedications: false,
    noNotifications: false,
    hasData: false,
    loading: false
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');

    if (!token || !expiryDate) return;

    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    axios.defaults.headers = {
      'Authorization': token,
      'Content-Type': 'application/json'
    };
    this.setState({ isAuth: true, loading: true });
    const remainSecond = new Date(expiryDate).getTime() - new Date().getTime();
    this.setAutoLogout(remainSecond);
    home()
      .then(({ home: { sendedDedications, receivedDedications, notifications, users } }) => {
        sendedDedications.length === 0 && this.setState({ noSendedDedications: true });
        receivedDedications.length === 0 && this.setState({ noReceivedDedications: true });
        notifications.length === 0 && this.setState({ noNotifications: true });
        users.length === 0 && this.setState({ users: true });
        this.setState({ users, receivedDedications, sendedDedications, notifications, loading: false, isAuth: true });
      })
      .catch(err => console.log(err));
    // const { home: { sendedDedications, receivedDedications, notifications, users } } = await home();
  }

  logoutHandler = () => {
    this.setState({ isAuth: false });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    delete axios.defaults.headers["Authorization"];
  }

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  getTracksHandler = async (term) => {
    this.setState({ tracks: await getTracks(term) });
  }

  render() {

    return (
      <Fragment>
        <Navbar
          isAuth={this.state.isAuth}
          notifications={this.state.notifications}
        />
        {
          this.state.isAuth ? (
            this.state.loading ? (
              <h1>sackleton</h1>
            ) : (
                <Fragment>
                  <Paper style={{ padding: 5, marginBottom: 20 }}>
                    <SearchBox
                      searchHandler={this.getTracksHandler}
                      title="Search for tracks"
                    />
                  </Paper>
                  <Tracks
                    tracks={this.state.tracks}
                    fromHome
                  />
                  <Paper style={{ padding: 10 }}>
                    <Typography variant="h6" color="primary">Recently joined users</Typography>
                    <UserThumbnailContainer
                      users={this.state.users}
                      noUsers={this.state.noUsers}
                    />
                  </Paper>
                  <Dedicate />
                </Fragment>
              )
          ) : (
              <Grid container spacing={5}>
                <Grid item>
                  <Typography>Feel music!</Typography>
                </Grid>
              </Grid>
            )
        }
      </Fragment>
    );
  }
}

export default Home;