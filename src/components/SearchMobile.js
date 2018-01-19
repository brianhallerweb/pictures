import React, { Component } from "react";
import "./App.css";
import { FormGroup, FormControl, Glyphicon, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { searchedPics } from "../actions/actions";

class SearchMobile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerms: ""
    };
  }

  searchPics = () => {
    fetch("/search/" + this.state.searchTerms)
      .then(response => response.json())
      .then(pics => {
        this.props.searchedPics(pics);
        this.setState({ searchTerms: "" });
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
              value={this.state.searchTerms}
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
  searchedPics: e => dispatch(searchedPics(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchMobile);
