import React, { Component } from "react";
import "./App.css";
import { Glyphicon, Tooltip, OverlayTrigger } from "react-bootstrap";
import { connect } from "react-redux";
import { addPics, addErrorMessage } from "../actions/actions";

class Shuffle extends Component {
  shuffle = () => {
    fetch("/pics")
      .then(response => response.json())
      .then(pic => this.props.addPics(this.randomOrder(pic)));
  };

  randomOrder = array => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  render() {
    const tooltip = (
      <Tooltip placement="bottom" className="in" id="tooltip-bottom">
        shuffle
      </Tooltip>
    );
    return (
      <div onClick={this.shuffle}>
        <OverlayTrigger
          placement="bottom"
          overlay={tooltip}
          delayShow={300}
          delayHide={150}
        >
          <Glyphicon
            glyph="glyphicon glyphicon-random"
            style={{
              fontSize: 20,
              color: "#757575"
            }}
          />
        </OverlayTrigger>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pics: state.reducer.pics
});

const mapDispatchToProps = dispatch => ({
  addPics: e => dispatch(addPics(e)),
  addErrorMessage: e => dispatch(addErrorMessage(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(Shuffle);
