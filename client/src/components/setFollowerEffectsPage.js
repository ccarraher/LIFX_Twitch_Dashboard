import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Form from "@rjsf/material-ui";
import { AppToken } from './Config';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import {useState} from 'react';
import { useLocation } from 'react-router';
import { Snackbar } from '@material-ui/core';
import MuiAlert from "@material-ui/lab/Alert";

var followerEffectsKey = "i";
var subKey = "t";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const schema = {
  "type": "object",
  "properties": {
    "Effects": {
      "type": "array",
      "items": [
        {
          "title": "",
          "description": "Please choose one of the effects below",
          "$ref": "#/definitions/person"
        }
      ]
    }
  },
  "definitions": {
    "person": {
      "title": "Person",
      "type": "object",
      "properties": {
        "Effect": {
          "type": "string",
          "enum": [
            "None",
            "Breathe",
            "Move",
            "Pulse"
          ],
          "default": "None"
        }
      },
      "required": [
        "Effect"
      ],
      "dependencies": {
        "Effect": {
          "oneOf": [
            {
              "properties": {
                "Effect": {
                  "enum": [
                    "None"
                  ]
                }
              }
            },
            {
              "properties": {
                "Effect": {
                  "enum": [
                    "Breathe"
                  ]
                },
                "color": {
                  "type": "string"
                },
                "from_color": {
                    "type": "string"
                },
                "period": {
                    "type": "number"
                },
                "cycles": {
                    "type": "number"
                },
                "persist": {
                    "type": "boolean"
                },
                "power_on": {
                    "type": "boolean"
                },
                "peak": {
                    "type": "number"
                },
              },
                "required": [
                  "color"
                ]
            },
            {
              "properties": {
                "Effect": {
                  "enum": [
                    "Move"
                  ]
                },
                "direction": {
                  "type": "string",
                  "enum": ["forward", "backward"]
                },
                "period": {
                    "type": "number"
                },
                "cycles": {
                    "type": "number"
                },
                "power_on": {
                    "type": "boolean"
                },
                "fast": {
                    "type": "boolean"
                },
              },
            },
            {
              "properties": {
                "Effect": {
                  "enum": [
                    "Pulse"
                  ]
                },
                "color": {
                  "type": "string"
                },
                "from_color": {
                  "type": "string"
                },
                "period": {
                  "type": "number"
                },
                "cycles": {
                  "type": "number"
                },
                "persist": {
                  "type": "boolean"
                },
                "power_on": {
                  "type": "boolean"
                },
              },
                "required": [
                  "color"
                ]
              }
          ]
        }
      }
    }
  }
};

const uiSchema = {
  "Effect": {
    "ui:widget": "color"
  },
  from_color: {
    "ui:widget": "color"
  },
  period: {
    "ui:widget": "range"
  },
  cycles: {
    "ui:widget": "range"
  },
  peak: {
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

  const handleSubmit = ({formData},e) =>{ 
    e.preventDefault();
    setOpen(true);
    var data;
    const URL = "http://localhost:3001/api/followerEffects";
    var badJSON = JSON.stringify(
      formData
    );
    console.log(badJSON);
    const storedFormData = localStorage.setItem(followerEffectsKey, badJSON);
    
    const effectwithbs = badJSON.substring(badJSON.indexOf(":") + 12)
    const effectwquotes = effectwithbs.substring(0,effectwithbs.indexOf(","));
    const effect = effectwquotes.substring(1, effectwquotes.length - 1);
    badJSON = badJSON.substring(badJSON.indexOf("[") + 1);
    data = badJSON.substring(0, badJSON.indexOf("]"));
    console.log(data);
    console.log("Data Submitted: ", data);
    var headers = {
      "Content-Type": "application/json"
    };
    const getRequest = async () => {
      try {
        const response = await axios.post(URL, data, {headers});
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
                    <h1>Set Effect:</h1>
                </Typography>
            </Grid>
            <Grid item xs={3} align="center" alignItems="center">
                <Form 
                    schema={schema}
                    uiSchema={uiSchema}
                    onSubmit={handleSubmit}
                    omitExtraData={false}
                    formData={JSON.parse(localStorage.getItem(followerEffectsKey))}
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