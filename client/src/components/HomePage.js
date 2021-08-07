import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonAppBar from "./NavBar";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Switch from "@material-ui/core/Switch";
import { useEffect } from "react";
import axios from "axios";
import io from 'socket.io-client';
import { useRef } from "react";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
  },
  media: {
    height: 200,
  },
});

const overflow = {
  overflow: "hidden"
}

const color = {
  display: "inline-flex"
}


export default function HomePage() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    followerChecked: false,
    subChecked: false
  });
  const[followerData, setFollowerData] = React.useState('');

  const [data, setData] = React.useState(null);


  useEffect(() => {
    if (window.location.hash)
    {
      var hash = window.location.hash.substr(1);
      var arHash = hash.split('=');
      var hash_value = arHash[1];
      var accessScopeSplit = hash_value.split('&');
      var access_token = accessScopeSplit[0];
    }
  }, []);


  const handleChange = (event) => {
    setState({...state, [event.target.name]: event.target.checked });

    if (event.target.name + event.target.checked == "followerCheckedtrue"){
      alert("Listening for followers  ")
    }

    if (event.target.name + event.target.checked == "subCheckedtrue"){
      alert("Listening for subs");
    }
  };

  return (
    <div>
      <Grid container spacing={0} alignItems="center" justify="center" alignContent="center" style={{ minHeight: "100vh - 50px" }}>
        <Grid item xs={12} align="center">
          <Typography>
            <h1>Events:</h1>
          </Typography>
        </Grid>
        <Grid item xs={3} align="center" alignItems="center">
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/twitch.png"
                title="New Follower Event"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  New Follower
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Edit color, brightness, etc in Edit State. Edit animation played on event in Edit Effect.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" component={Link} to={{pathname:"/editfollowerstate", state:{twitchEvent: "follower_state"}}}>
                Edit State
              </Button>
              <Button size="small" color="primary" component={Link} to={{pathname:"/editfollowereffects", state:{twitchEvent: "follower_effects"}}}>
                Edit Effects
              </Button>
              <Switch
                checked={state.followerChecked}
                onChange={handleChange}
                name="followerChecked"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={3} align="center" alignItems="center">
        <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="/twitch.png"
                title="New Subscriber Event"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  New Subscriber
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Edit color, brightness, etc in Edit State. Edit animation played on event in Edit Effect.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" component={Link} to={{pathname:"/editsubstate", state:{twitchEvent: "sub_state"}}}> 
                Edit State
              </Button>
              <Button size="small" color="primary" component={Link} to={{pathname:"/editsubeffects", state:{twitchEvent: "sub_effects"}}}>
                Edit Effects
              </Button>
              <Switch
                checked={state.subChecked}
                onChange={handleChange}
                name="subChecked"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}