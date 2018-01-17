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
import { addPics } from "../actions/actions";

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
    }).then(() =>
      fetch("/pics")
        .then(response => response.json())
        .then(pics => this.props.addPics(pics))
    );
  };

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

              <input
                type="file"
                onChange={e => this.setState({ myImage: e.target.files[0] })}
              />
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
  addPics: e => dispatch(addPics(e))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPic);
