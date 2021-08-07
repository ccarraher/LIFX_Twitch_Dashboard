import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Form from "@rjsf/material-ui";
import { AppToken } from './Config';
import axios from 'axios';
import { FormHelperText, Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { useLocation } from 'react-router';
import { Snackbar } from '@material-ui/core';
import MuiAlert from "@material-ui/lab/Alert";

var followerStateKey = 'f';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const schema = {
  type: "object",
  properties: {
    power: {
      type: "string",
      title: "Power",
      enum: ["on", "off"]
    },
    color: {
      type: "string",
      title: "Color",
    },
    brightness: {
      type: "number",
      title: "Brightness",
      minimum: 0,
      maximum: 1,
      multipleOf: 0.1
    },
    duration: {
      type: "number",
      title: "Duration (sec)",
      minimum: 0,
      maximum: 100,
    },
    fast: {
      type: "boolean",
      title: "Fast"
    },
    selector: {
      title: "Selector",
      type: "array",
      "items": {
        "type": "string",
        "enum": [
          "1",
          "2",
          "3",
          "4"
        ]
      },
      "uniqueItems": true
    }
  }
};

const uiSchema = {
  color: {
    "ui:widget": "color"
  },
  brightness: {
    "ui:widget": "range"
  },
  duration: {
    "ui:widget": "range"
  }
};


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default function ActionsInAccordionSummary() {
  const classes = useStyles();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const URL = "http://localhost:3001/api/followerState";
  const handleSubmit = ({formData},e) =>{ 
    e.preventDefault();
    setOpen(true);
    var payload = JSON.stringify(
      formData
    );
    const storedFormDataStateFollower = localStorage.setItem(followerStateKey, payload);
    var headers = {
      "Content-Type": "application/json"
    };
    console.log("Data Submitted: ", payload);
    const getRequest = async () => {
      try {
        const response = await axios.post(URL, payload, {headers});
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    getRequest();
  };
  return (
    <div className={classes.root}>
        <Grid container spacing={1} alignItems="center" justify="center" alignContent="center" style={{ minHeight: "100vh - 30px" }}>
            <Grid item xs={12} align="center">
                <Typography>
                    <h1>Set State:</h1>
                </Typography>
            </Grid>
            <Grid item xs={3} align="center" alignItems="center">
                <Form 
                    schema={schema} 
                    uiSchema={uiSchema}
                    onSubmit={handleSubmit}
                    formData={JSON.parse(localStorage.getItem(followerStateKey))}
                /> 
            </Grid>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                Successfully Submitted!
              </Alert>
            </Snackbar>
        </Grid>
    </div>
  );
}