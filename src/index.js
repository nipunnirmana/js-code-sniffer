import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Start from "./Start";
import Results from "./Results";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const routing = (
  <Router>
    <Route exact path="/" component={App} />
    <Route exact path="/start" component={Start} />
    <Route exact path="/results" component={Results} />
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
