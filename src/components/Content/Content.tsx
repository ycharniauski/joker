import React, { Component } from "react";
import { Route } from "react-router-dom";

import { ROUTE_HOME, ROUTE_ABOUT } from "constants/routes";

import Home from "screens/Home";
import About from "screens/About";

export default function Content() {
  return (
    <div className="app-content">
      <div className="app-content__page">
        <Route exact path={ROUTE_HOME} component={Home} />
        <Route path={ROUTE_ABOUT} component={About} />
      </div>
    </div>
  );
}
