import React, { useState, useEffect, Fragment } from "react";
import Moment from "react-moment";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

// Icons
import LocationIcon from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

// API
import { showUser, follow, unfollow } from "../../api";

const style = {
  center: {
    textAlign: "center",
  },
  flex: {
    display: "flex",
  },
  username: {
    cursor: "pointer",
    display: "inline",
  },
};

const User = (props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [username, setUsername] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState("");
  const [isFollow, setIsFollow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const data = await showUser(props.id);
      if (data.status) {
        setErrors(data.message);
      }
      const { username, createdAt, name, bio, website, location } = data?.user;
      setUsername(username);
      setCreatedAt(createdAt);
      setName(name);
      setBio(bio);
      setWebsite(website);
      setLocation(location);
      setLoading(false);
      setIsFollow(data.follow);
    };
    fetchData();
  }, [open, props.id]);

  const openHandler = () => {
    setOpen(true);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  const followHandler = async () => {
    setFollowLoading(true);
    await follow(props.id);
    setIsFollow(true);
    setFollowLoading(false);
  };

  const unfollowHandler = async () => {
    setFollowLoading(true);
    await unfollow(props.id);
    setIsFollow(false);
    setFollowLoading(false);
  };

  const { classes } = props;
  return (
    <Fragment>
      <div onClick={openHandler}>
        <Tooltip title={props.username} placement="top">
          <Typography
            variant="body2"
            className={classes.username}
            color="secondary"
          >
            @{props.username}
          </Typography>
        </Tooltip>
      </div>
      <Dialog onClose={closeHandler} fullWidth open={open} maxWidth="sm">
        <DialogContent className={classes.content}>
          {loading ? (
            <div style={{ margin: "50px auto 50px auto", textAlign: "center" }}>
              <CircularProgress
                value={10}
                variant="indeterminate"
                color="secondary"
              />
            </div>
          ) : errors ? (
            <Fragment>
              <Typography variant="body2" className={classes.center}>
                {errors}
              </Typography>
            </Fragment>
          ) : (
            <Fragment>
              <Typography variant="h3">{username}</Typography>
              {isFollow ? (
                <Button
                  variant="contained"
                  onClick={unfollowHandler}
                  disabled={followLoading ? true : false}
                  color="secondary"
                >
                  Unfollow
                  {followLoading && (
                    <div style={{ marginLeft: "10px" }}>
                      <CircularProgress
                        size={10}
                        variant="indeterminate"
                        color="primary"
                      />
                    </div>
                  )}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={followHandler}
                  color="primary"
                  disabled={followLoading ? true : false}
                >
                  Follow
                  {followLoading && (
                    <div style={{ marginLeft: "10px" }}>
                      <CircularProgress
                        size={10}
                        variant="indeterminate"
                        color="secondary"
                      />
                    </div>
                  )}
                </Button>
              )}
              <br />
              {name && <Typography variant="h6">{name}</Typography>}
              {bio && (
                <div>
                  <Typography variant="body2">{bio}</Typography>
                  <br />
                </div>
              )}
              {website && (
                <div style={{ display: "flex" }}>
                  <LinkIcon color="primary" />{" "}
                  <a target="_blank" href={website} rel="noopener noreferrer">
                    {website}
                  </a>
                  <br />
                </div>
              )}
              {location && (
                <div style={{ display: "flex" }}>
                  <LocationIcon color="primary" /> <span>{location}</span>
                  <br />
                </div>
              )}
              <div style={{ display: "flex" }}>
                <CalendarTodayIcon color="primary" />{" "}
                <span>
                  Joined on <Moment format="YYYY, MMM" date={createdAt} />
                </span>
              </div>
            </Fragment>
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(style)(User);
