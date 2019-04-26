import { Modal, ModalBody } from "reactstrap";
import React, { Component } from "react";
import "../../css/alert.css";
class ModalAlert extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        size="sm"
        backdrop="false"
        keyboard="false"
        centered="false"
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
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default ModalAlert;
