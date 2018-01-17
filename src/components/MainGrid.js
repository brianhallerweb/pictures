import React, { Component } from "react";
import "./App.css";
import HeaderGrid from "./HeaderGrid";
import PictureGrid from "./PictureGrid";

class MainGrid extends Component {
  render() {
    return (
      <div className="mainGrid">
        <header>
          <HeaderGrid />
        </header>
        <main>
          <PictureGrid />
        </main>
      </div>
    );
  }
}

export default MainGrid;
