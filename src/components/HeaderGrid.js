import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Title from "./Title";
import AddNewPic from "./AddNewPic";
import Shuffle from "./Shuffle";
import Search from "./Search";
import { connect } from "react-redux";
import { searchedPics } from "../actions/actions";

class HeaderGrid extends Component {
  render() {
    return (
      <div>
        <div className="headerGrid">
          <div className="titleDiv" onClick={() => this.props.searchedPics([])}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Title />
            </Link>
          </div>

          <AddNewPic />
          <Shuffle />
          <Search />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  searchedPics: e => dispatch(searchedPics(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderGrid);
