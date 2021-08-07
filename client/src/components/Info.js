import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { List, ListItemText } from '@material-ui/core';
import { ListItem } from '@material-ui/core';
import { ListSubheader } from '@material-ui/core';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="State" {...a11yProps(0)} />
          <Tab label="Effects" {...a11yProps(1)} />
          <Tab label="Selector" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <h1>State</h1>
        <List>
            <ListItem>
                <ListItemText primary="Color: Changes color of the lights" />
            </ListItem>
            <ListItem>
                <ListItemText primary="Brightness: Changes brightness of the lights. Range from 0.0 to 1.0"/>
            </ListItem>
            <ListItem>
                <ListItemText primary="Duration: Changes duration of the state. Range from 0.0 to 3155760000 (100 years)" />
            </ListItem>
            <ListItem>
                <ListItemText primary="Fast: Execute the query fast, without initial state checks and wait for no results."/>
            </ListItem>
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1>Effects</h1>
        <List subheader={<ListSubheader>Breathe Effect</ListSubheader>}>
            <ListItem>
                <ListItemText primary="Color: Changes color of the lights" />
            </ListItem>
            <ListItem>
                <ListItemText primary="From Color: Changes color to start the effect from. If this parameter is omitted then the color the bulb is currently set to is used instead"/>
            </ListItem>
            <ListItem>
                <ListItemText primary="Period: The time in seconds for one cycle of the effect" />
            </ListItem>
            <ListItem>
                <ListItemText primary="Cycles: The number of times to repeat the effect"/>
            </ListItem>
            <ListItem>
                <ListItemText primary="Persist: If false set the light back to its previous value when effect ends, if true leave the last effect color"/>
            </ListItem>
            <ListItem>
                <ListItemText primary="Power On: If true, turn the bulb on if it is not alread on"/>
            </ListItem>
            <ListItem>
                <ListItemText primary="Peak: Defines where in a period the target color is at its maximum. Minimum 0.0, maximum 1.0."/>
            </ListItem>
        </List>
        <List subheader={<ListSubheader>Move Effect</ListSubheader>}>
            <ListItem>
                <ListItemText primary="Other settings same as Breathe" />
            </ListItem>
            <ListItem>
                <ListItemText primary="Direction: Move direction, can be forward or backward." />
            </ListItem>
            <ListItem>
                <ListItemText primary="Move: The move effect REQUIRES you to use selector in set State page" />
            </ListItem>
        </List>
        <List subheader={<ListSubheader>Pulse Effect</ListSubheader>}>
            <ListItem>
                <ListItemText primary="Other settings same as Breathe and Move/ are very self explanatory" />
            </ListItem>
            
        </List>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h1>Selector</h1>
        <List>
            <ListItem>
                <ListItemText primary="What does selector do?: The selector specifies what zone you would like to set state for. For example, setting a selector of [1, 2] lights up the first two zones of the LED strip with the settings you specify in set State page" />
            </ListItem>
            <ListItem>
                <ListItemText primary="Move Effect: In order to get the move effect to work you must first select a DIFFERENT color using the set State page and the selector option to set a zone for the second color that you would like to move." />
            </ListItem>
            <ListItem>
                <ListItemText primary="Resetting Color after using a selector and move effect: After the move effect is finished the lights have a tendency to not revert back to their normal state so you may have to manually reset the state of the color" />
            </ListItem>
        </List>
      </TabPanel>
    </div>
  );
}