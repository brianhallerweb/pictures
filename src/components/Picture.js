import React, { Component } from "react";
import "./App.css";
import { Modal, Button } from "react-bootstrap";

class Picture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  render() {
    return (
      <div>
        <div
          onClick={() => this.setState({ showModal: !this.state.showModal })}
        >
          This will be a picture
        </div>
        <Modal
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
        >
          <Modal.Body>
            This is the modal where you will show a picture of {this.props.name}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ showModal: false })}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Picture;
