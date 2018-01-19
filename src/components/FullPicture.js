import React, { Component } from "react";
import "./App.css";
import Title from "./Title";
import AddNewPic from "./AddNewPic";
import Search from "./Search";
import { Glyphicon } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addPics } from "../actions/actions";
import { CloudinaryContext, Transformation, Image } from "cloudinary-react";

class FullPicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullScreenPicId: "",
      id: props.match.params.id
    };
  }

  componentDidMount() {
    fetch("/pic/" + this.state.id)
      .then(response => response.json())
      .then(id => this.setState({ fullScreenPicId: id.cloudinaryId }));
  }

  deletePicture = () => {
    fetch("/delete/" + this.props.mongoId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cloudinary_id: this.props.cloudinaryId
      })
    }).then(() =>
      fetch("/pics")
        .then(response => response.json())
        .then(pics => {
          this.props.addPics(pics);
          this.props.history.push("/");
        })
    );
  };

  render() {
    return (
      <div className="fullScreen">
        <div className="fullScreenHeader">
          <Link to={"/"}>
            <Glyphicon
              glyph="glyphicon glyphicon-remove-circle"
              style={{ color: "white", fontSize: 25 }}
            />
          </Link>
          <div>
            <Glyphicon
              onClick={() => {
                this.deletePicture();
              }}
              glyph="glyphicon glyphicon-trash"
              style={{ color: "white", fontSize: 20, marginTop: 30 }}
            />
          </div>
        </div>
        <Image cloudName="brianhallerweb" publicId={this.state.fullScreenPicId}>
          <Transformation crop="fit" />
        </Image>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cloudinaryId: state.reducer.cloudinaryId,
  mongoId: state.reducer.mongoId
});

const mapDispatchToProps = dispatch => ({
  addPics: e => dispatch(addPics(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(FullPicture);
