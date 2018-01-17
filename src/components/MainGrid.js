import React, { Component } from "react";
import "./App.css";
import HeaderGrid from "./HeaderGrid";
import PictureGrid from "./PictureGrid";
import SearchMobile from "./SearchMobile";

class MainGrid extends Component {
  render() {
    return (
      <div className="mainGrid">
        <header>
          <HeaderGrid />
        </header>
        <section>
          <SearchMobile />
        </section>
        <main>
          <PictureGrid />
        </main>
      </div>
    );
  }
}

export default MainGrid;
