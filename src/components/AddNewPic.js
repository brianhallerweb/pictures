import React, { Component } from "react";
import "./App.css";
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import { connect } from "react-redux";
import { addPics, addErrorMessage } from "../actions/actions";
import Dropzone from "react-dropzone";

class AddNewPic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      keywords: "",
      myImage: ""
    };
  }

  postPic = () => {
    var formData = new FormData();
    formData.append("keywords", this.state.keywords);
    formData.append("myImage", this.state.myImage);
    fetch("/pics", {
      method: "POST",
      body: formData
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
  };

  onDrop(files) {
    this.setState({
      myImage: files[0]
    });
  }

  render() {
    return (
      <div>
        <div
          onClick={() => this.setState({ showModal: !this.state.showModal })}
        >
          <i
            className="fa fa-plus-square-o"
            aria-hidden="true"
            style={{ fontSize: 30, color: "#E0E0E0" }}
          />
        </div>
        <Modal
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        >
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
                    Drag & drop or click to upload a picture
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
