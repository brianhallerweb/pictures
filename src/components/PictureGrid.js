import React, { Component } from "react";
import "./App.css";
import Picture from "./Picture";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { addPics } from "../actions/actions";

class PictureGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      currentPic: ""
    };
  }

  componentDidMount() {
    fetch("/pics")
      .then(response => response.json())
      .then(pics => this.props.addPics(this.shuffle(pics)));
  }

  shuffle(array) {
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
  }

  render() {
    return (
      <div>
        <div className="pictureGrid">
          {this.props.searchedPics.length === 0
            ? this.props.pics.map(pic => {
                return (
                  <div>
                    <img
                      onClick={() =>
                        this.setState({
                          showModal: !this.state.showModal,
                          currentPic: pic.filePath
                        })
                      }
                      src={pic.filePath}
                      alt="picture"
                      height="110px"
                      style={{
                        borderRadius: 2
                      }}
                    />
                  </div>
                );
              })
            : this.props.searchedPics.map(pic => {
                return (
                  <div>
                    <img
                      onClick={() =>
                        this.setState({
                          showModal: !this.state.showModal,
                          currentPic: pic.filePath
                        })
                      }
                      src={pic.filePath}
                      alt="picture"
                      height="110px"
                      style={{
                        borderRadius: 2
                      }}
                    />
                  </div>
                );
              })}
        </div>
        <Modal
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <Modal.Body>
            <img
              src={this.state.currentPic}
              alt="picture"
              width="100%"
              style={{
                borderRadius: 2
              }}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pics: state.reducer.pics,
  searchedPics: state.reducer.searchedPics
});

const mapDispatchToProps = dispatch => ({
  addPics: e => dispatch(addPics(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(PictureGrid);
