import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from '@material-ui/core/CssBaseline';
import RouterPage from "./components/RouterPage";


const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: '#9A55FF'
    },
    background: {
      default: '#0E0E10',
      paper: '#17171a'
    }
  },
  overrides: {
    MuiGrid: {
      container: {
        width: "100 !important",
        margin: "0 !important"
      }
    }
  }
});

const rootElement = document.getElementById("app");
ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterPage />
    </ThemeProvider>
  </>,
  rootElement
);
