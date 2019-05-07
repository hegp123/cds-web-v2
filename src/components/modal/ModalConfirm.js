import { Modal, ModalBody } from "reactstrap";
import React, { Component } from "react";
import "../../css/Alert.css";

class ModalConfirm extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        size="sm"
        centered={true}
        contentClassName="body-transparent"
        onClosed={this.props.callbackOnClosed}
      >
        <ModalBody>
          <div className="container">
            <div className="row,text-center">
              <h3 className="popup-title">CDS Web</h3>
            </div>
            <br />
            <div className="row">
              <div className="popup-container">{this.props.content}</div>
            </div>
            <div className="row, text-center">
              <div className="popup-container-button">
                <button
                  color="primary"
                  className="buttonFmb btn btn-primary  btn-sm"
                  onClick={this.props.toggle}
                >
                  Aceptar
                </button>
                {"  "}
                <button
                  color="secundary"
                  className="buttonFmb btn btn-secundary  btn-sm"
                  onClick={this.props.toggle}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default ModalConfirm;
