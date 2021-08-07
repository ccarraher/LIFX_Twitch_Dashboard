import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Form from "@rjsf/material-ui";
import { AppToken } from './Config';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { useLocation } from 'react-router';

var subStateKey = "s";

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
  const URL = "http://localhost:3001/api/subState";
  const handleSubmit = ({formData},e) =>{ 
    e.preventDefault();
    var payload = JSON.stringify(
      formData
    );
    const storedFormDataStateSub = localStorage.setItem(subStateKey, payload);
    console.log("Data Submitted: ", payload)
    const getRequest = async () => {
      try {
        const response = await axios.put(URL, payload);
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
                    formData={JSON.parse(localStorage.getItem(subStateKey))}
                /> 
            </Grid>
        </Grid>
    </div>
  );
}