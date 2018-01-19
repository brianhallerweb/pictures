import React, { Component } from "react";
import "./App.css";
import { Glyphicon } from "react-bootstrap";
import { connect } from "react-redux";
import { addPics, getMongoId, getCloudinaryId } from "../actions/actions";
import { Link } from "react-router-dom";
import { Transformation, Image } from "cloudinary-react";

class PictureGrid extends Component {
  componentDidMount() {
    fetch("/pics")
      .then(response => response.json())
      .then(pics => this.props.addPics(pics));
  }

  render() {
    return (
      <div>
        {this.props.searchedPics.length === 0 ? (
          <div className="pictureGrid">
            {this.props.pics.map(pic => {
              return (
                <Link
                  to={`/${pic.cloudinaryId}`}
                  onClick={() => {
                    this.setState({
                      modalClassName: "show"
                    });
                    this.props.getMongoId(pic._id);
                    this.props.getCloudinaryId(pic.cloudinaryId);
                  }}
                >
                  <Image cloudName="brianhallerweb" publicId={pic.cloudinaryId}>
                    <Transformation
                      height="100"
                      width="100"
                      gravity="faces"
                      crop="fill"
                    />
                  </Image>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="pictureGrid">
            <Link
              to="/"
              style={{ textDecoration: "none" }}
              onClick={() => this.props.searchedPics([])}
            >
              <Glyphicon
                glyph="glyphicon glyphicon-arrow-left"
                style={{
                  marginTop: 35,
                  marginLeft: 35,
                  fontSize: 25,
                  color: "black"
                }}
              />
            </Link>
            {this.props.searchedPics.map(pic => {
              return (
                <Link
                  to={`/${pic.cloudinaryId}`}
                  onClick={() => {
                    this.setState({
                      modalClassName: "show"
                    });
                    this.props.getMongoId(pic._id);
                    this.props.getCloudinaryId(pic.cloudinaryId);
                  }}
                >
                  <Image cloudName="brianhallerweb" publicId={pic.cloudinaryId}>
                    <Transformation
                      height="100"
                      width="100"
                      gravity="faces"
                      crop="fill"
                    />
                  </Image>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pics: state.reducer.pics,
  searchedPics: state.reducer.searchedPics,
  cloudinaryId: state.reducer.cloudinaryId,
  mongoId: state.reducer.mongoId
});

const mapDispatchToProps = dispatch => ({
  addPics: e => dispatch(addPics(e)),
  getCloudinaryId: e => dispatch(getCloudinaryId(e)),
  getMongoId: e => dispatch(getMongoId(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(PictureGrid);
