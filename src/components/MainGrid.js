import React, { Component } from "react";
import "./App.css";
import HeaderGrid from "./HeaderGrid";
import PictureGrid from "./PictureGrid";
import SearchMobile from "./SearchMobile";

class MainGrid extends Component {
  render() {
    return (
      <div>
        <header>
          <HeaderGrid />
        </header>
        <div className="mainGrid">
          <section>
            <SearchMobile />
          </section>
          <main>
            <PictureGrid />
          </main>
        </div>
      </div>
    );
  }
}

export default MainGrid;
