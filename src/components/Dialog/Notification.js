import React, { Fragment, useState } from "react";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";

// Icons
import NotificationsIcon from "@material-ui/icons/Notifications";
import CloseButton from "@material-ui/icons/Close";

// Components
import TooltipButton from "../Button/TooltipButton";
import NotificationTrackThumbnail from "../Notification/TrackThumbnail";
import User from "./User";

const style = {
  center: {
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 5,
  },
};

const Notification = ({ classes, notifications }) => {
  const [open, setOpen] = useState(false);

  const openHandler = () => {
    setOpen(true);
  };

  const closeHandler = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <TooltipButton
        placement="top"
        onClick={openHandler}
        title="Notifications"
      >
        <NotificationsIcon />
      </TooltipButton>
      <Dialog onClose={closeHandler} fullWidth open={open} maxWidth="xs">
        <TooltipButton
          onClick={closeHandler}
          title="Close"
          btnClass={classes.closeButton}
        >
          <CloseButton color="primary" />
        </TooltipButton>
        <DialogTitle className={classes.center}>
          <Typography variant="h5">Notifications!</Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            {notifications.map(
              ({ sender, createdAt, dedicateId, type }, key) => {
                let artistName, previewUrl, trackName;
                if (dedicateId) {
                  artistName = dedicateId.artistName;
                  previewUrl = dedicateId.previewUrl;
                  trackName = dedicateId.trackName;
                }
                const typeText =
                  type === "dedicate"
                    ? "Dedicate a song to you."
                    : "Started following you.";

                return (
                  <Grid item sm={12}>
                    <User username={sender.username} id={sender._id} />
                    <Typography variant="body2">{typeText}</Typography>
                    {type === "dedicate" && (
                      <NotificationTrackThumbnail
                        artistName={artistName}
                        previewUrl={previewUrl}
                        trackName={trackName}
                      />
                    )}
                  </Grid>
                );
              }
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default withStyles(style)(Notification);
