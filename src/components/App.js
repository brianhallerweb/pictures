import React, { Component } from "react";
import "./App.css";
import MainGrid from "./MainGrid";
import FullPicture from "./FullPicture";
import { Route } from "react-router-dom";
import { ConnectedRouter as Router } from "react-router-redux";
import { history } from "../store";
import ErrorModal from "./ErrorModal";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          <Route exact path="/" component={MainGrid} />
          <Route path="/:id" component={FullPicture} />
          <ErrorModal />
        </div>
      </Router>
    );
  }
}

export default App;
