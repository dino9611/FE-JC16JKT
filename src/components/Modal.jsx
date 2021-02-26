import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

class ModalComp extends Component {
  state = {};
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={this.props.toggle}
        contentClassName="bg-modal"
      >
        <ModalHeader toggle={this.props.toggle}>{this.props.title}</ModalHeader>
        <ModalBody>{this.props.children}</ModalBody>
        <ModalFooter>
          <button className="btn btn-primary" onClick={this.props.saveData}>
            {this.props.Edit ? "Save data" : "add Data"}
          </button>
          {this.props.Edit ? (
            <button
              className="btn btn-secondary"
              onClick={this.props.Cancel}
            ></button>
          ) : null}
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalComp;
