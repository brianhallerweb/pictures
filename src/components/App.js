import React, { Component } from "react";
import "./App.css";
import MainGrid from "./MainGrid";
import { Route } from "react-router-dom";
import { ConnectedRouter as Router } from "react-router-redux";
import { history } from "../store";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={MainGrid} />
        </div>
      </Router>
    );
  }
}

export default App;
