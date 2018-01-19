import React, { Component } from "react";
import "./App.css";
import { Glyphicon } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addPics, addErrorMessage } from "../actions/actions";
import { Transformation, Image } from "cloudinary-react";

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
    }).then(response => {
      if (response.status === 500) {
        this.props.addErrorMessage("Your picture failed to delete. Try again.");
      } else {
        fetch("/pics")
          .then(response => response.json())
          .then(pics => {
            this.props.history.push("/");
            this.props.addPics(pics);
          });
      }
    });
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
  addPics: e => dispatch(addPics(e)),
  addErrorMessage: e => dispatch(addErrorMessage(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(FullPicture);
