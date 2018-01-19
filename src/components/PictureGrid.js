import React, { Component } from "react";
import "./App.css";
import { Glyphicon } from "react-bootstrap";
import { connect } from "react-redux";
import { addPics } from "../actions/actions";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";

class PictureGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      currentPicId: "",
      cloudinaryId: "",
      height: "",
      width: "",
      modalClassName: "noShow"
    };
  }

  componentWillMount() {
    this.setState({
      height: window.innerHeight,
      width: window.innerWidth
    });
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

  deletePicture = () => {
    fetch("/delete/" + this.state.currentPicId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cloudinary_id: this.state.cloudinaryId
      })
    }).then(() =>
      fetch("/pics")
        .then(response => response.json())
        .then(pics => {
          this.props.addPics(pics);
          this.setState({ showModal: false });
        })
    );
  };

  render() {
    return (
      <div>
        <div className="pictureGrid">
          {this.props.searchedPics.length === 0
            ? this.props.pics.map(pic => {
                return (
                  <div
                    onClick={() =>
                      this.setState({
                        modalClassName: "show",
                        currentPicId: pic._id,
                        cloudinaryId: pic.cloudinaryId
                      })
                    }
                  >
                    <Image
                      cloudName="brianhallerweb"
                      publicId={pic.cloudinaryId}
                    >
                      <Transformation
                        height="100"
                        width="100"
                        gravity="faces"
                        crop="fill"
                      />
                    </Image>
                  </div>
                );
              })
            : this.props.searchedPics.map(pic => {
                return (
                  <div
                    onClick={() =>
                      this.setState({
                        modalClassName: "show",
                        currentPicId: pic._id,
                        cloudinaryId: pic.cloudinaryId
                      })
                    }
                  >
                    <Image
                      cloudName="brianhallerweb"
                      publicId={pic.cloudinaryId}
                    >
                      <Transformation
                        height="100"
                        width="100"
                        gravity="faces"
                        crop="fill"
                      />
                    </Image>
                  </div>
                );
              })}
        </div>

        <div className={this.state.modalClassName}>
          <div className="modalHeader">
            <Glyphicon
              onClick={() =>
                this.setState({
                  modalClassName: "noShow"
                })
              }
              glyph="glyphicon glyphicon-remove-circle"
              style={{ color: "white", fontSize: 25 }}
            />
            <div>
              <Glyphicon
                onClick={() => {
                  this.deletePicture();
                  this.setState({
                    modalClassName: "noShow"
                  });
                }}
                glyph="glyphicon glyphicon-trash"
                style={{ color: "white", fontSize: 20, marginTop: 30 }}
              />
            </div>
          </div>
          <Image cloudName="brianhallerweb" publicId={this.state.cloudinaryId}>
            <Transformation
              height={this.state.height}
              width={this.state.width}
              crop="fit"
            />
          </Image>
        </div>
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
