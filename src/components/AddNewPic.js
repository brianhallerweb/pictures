import React, { Component } from "react";
import "./App.css";
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  Tooltip,
  OverlayTrigger
} from "react-bootstrap";
import { connect } from "react-redux";
import { addPics, addErrorMessage } from "../actions/actions";
import Dropzone from "react-dropzone";
import request from "superagent";

const CLOUDINARY_UPLOAD_PRESET = "exabyfdn";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/brianhallerweb/upload";

class AddNewPic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      keywords: "",
      myImage: ""
    };
  }

  postPic() {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", this.state.myImage);

    upload.end((err, response) => {
      if (err) {
        this.props.addErrorMessage(
          "Your picture failed to save. Make sure your picture is a jpg or png and you have included keywords."
        );
      }

      if (response.body.secure_url !== "") {
        fetch("/pics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            keywords: this.state.keywords,
            cloudinaryId: response.body.public_id
          })
        })
          .then(response => {
            if (response.status === 500) {
              this.props.addErrorMessage(
                "Your picture failed to save. Make sure your picture is a jpg or png and you have included keywords."
              );
            }
          })
          .then(() =>
            fetch("/pics")
              .then(response => response.json())
              .then(pics => {
                this.props.addPics(pics);
                this.setState({ showModal: false, myImage: "" });
              })
          );
      }
    });
  }

  onDrop(accepted, rejected) {
    if (rejected.length !== 0) {
      this.props.addErrorMessage("Your picture must be a jpg or png");
    }

    this.setState({
      myImage: accepted[0]
    });
  }

  render() {
    const tooltip = (
      <Tooltip placement="bottom" className="in" id="tooltip-bottom">
        add new
      </Tooltip>
    );
    return (
      <div>
        <div
          onClick={() => this.setState({ showModal: !this.state.showModal })}
        >
          <OverlayTrigger
            placement="bottom"
            overlay={tooltip}
            delayShow={300}
            delayHide={150}
          >
            <i
              className="fa fa-plus-square-o"
              aria-hidden="true"
              style={{ fontSize: 30, color: "#757575" }}
            />
          </OverlayTrigger>
        </div>
        <Modal show={this.state.showModal}>
          <Modal.Body>
            <form>
              <FormGroup>
                <ControlLabel>Keywords</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter keywords that describe this picture"
                  onChange={e => this.setState({ keywords: e.target.value })}
                />
              </FormGroup>

              <ControlLabel>Picture</ControlLabel>
              <Dropzone
                onDrop={this.onDrop.bind(this)}
                accept="image/jpeg, image/png"
                style={{
                  borderStyle: "dashed",
                  borderWidth: 1,
                  borderRadius: 2,
                  borderColor: "#bdbdbd"
                }}
                activeStyle={{ borderStyle: "solid", borderColor: "#d9534f" }}
              >
                <div
                  style={{
                    marginTop: 10,
                    marginLeft: 12
                  }}
                >
                  <p
                    style={{
                      color: "#989898"
                    }}
                  >
                    Drag & drop or click to upload a picture (single jpg/png
                    files only)
                  </p>
                  {this.state.myImage ? (
                    <p
                      style={{
                        color: "#d9534f",
                        fontWeight: "bold"
                      }}
                    >
                      File selected: {this.state.myImage.name}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </Dropzone>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              bsStyle="primary"
              onClick={e => {
                e.preventDefault();
                this.postPic();
                this.setState({ showModal: false });
              }}
            >
              Save
            </Button>
            <Button onClick={() => this.setState({ showModal: false })}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPic);
