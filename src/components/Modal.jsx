import React, { Component } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import Proptypes from "prop-types";
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
            <button className="btn btn-secondary" onClick={this.props.Cancel}>
              Cancel
            </button>
          ) : null}
        </ModalFooter>
      </Modal>
    );
  }
}

ModalComp.propTypes = {
  isOpen: Proptypes.func,
  title: Proptypes.string,
  Edit: Proptypes.bool,
  Cancel: Proptypes.func,
  saveData: Proptypes.func,
  toggle: Proptypes.func,
};

export default ModalComp;
