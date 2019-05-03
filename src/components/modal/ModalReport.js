import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "../../css/Alert.css";
import { numberFilter } from "../../utils/Utils";

class ModalReport extends Component {
  constructor(props) {
    super(props);
  }

  alertar() {
    this.props.setMasterChanged();
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} size="lg" className="modal-print">
        <ModalHeader toggle={this.props.toggle} className="body-header" />

        <ModalBody className="pop-up-padding">
          <div className="container">
            <div className="row">
              <div className="label-popup">
                <b>Punto de recaudo:</b> {this.props.customer}
              </div>
            </div>
            <div className="row">
              <div className="label-popup">
                <b>Total pagado:</b> {this.props.customer}
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default ModalReport;
