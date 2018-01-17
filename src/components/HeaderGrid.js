import React, { Component } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Title from "./Title";
import AddNewPic from "./AddNewPic";
import Search from "./Search";
import { connect } from "react-redux";
import { searchedPics } from "../actions/actions";

class HeaderGrid extends Component {
  render() {
    return (
      <div className="headerGrid">
        <div onClick={() => this.props.searchedPics([])}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Title />
          </Link>
        </div>
        <div>
          <AddNewPic />
        </div>
        <div>
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
