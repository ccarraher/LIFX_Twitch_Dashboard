import React, { Component } from "react";
import setFollowStatePage from "./setFollowerStatePage";
import setFollowEffectsPage from "./setFollowerEffectsPage";
import setSubStatePage from "./setSubStatePage";
import setSubEffectsPage from "./setSubEffectsPage";
import HomePage from "./HomePage";
import Login from "./Login";
import PrimarySearchAppBar from "./NavBar";
import Info from "./Info";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default function RouterPage() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <div>
          <PrimarySearchAppBar />
          <Route path="/home" component={HomePage} />
          <Route path="/editfollowerstate" component={setFollowStatePage} />
          <Route path="/editfollowereffects" component={setFollowEffectsPage} />
          <Route path="/editsubstate" component={setSubStatePage} />
          <Route path="/editsubeffects" component={setSubEffectsPage} />
          <Route path="/info" component={Info} />
        </div>
      </Switch>
    </Router>
  );
}