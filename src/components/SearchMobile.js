import React, { Component } from "react";
import "./App.css";
import { FormGroup, FormControl, Glyphicon, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { searchedPics, addErrorMessage } from "../actions/actions";

class SearchMobile extends Component {
  searchPics = () => {
    fetch("/search/" + this.state.searchTerms)
      .then(response => response.json())
      .then(pics => {
        if (pics.length === 0) {
          this.props.addErrorMessage("No search results");
        } else {
          this.props.searchedPics(pics);
        }
      });
  };

  render() {
    return (
      <div className="searchMobile">
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search by keyword"
              onChange={e => this.setState({ searchTerms: e.target.value })}
            />

            <InputGroup.Addon
              onClick={() => this.searchPics()}
              className="searchIcon"
            >
              <Glyphicon glyph="glyphicon glyphicon-search" />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  searchedPics: e => dispatch(searchedPics(e)),
  addErrorMessage: e => dispatch(addErrorMessage(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchMobile);
