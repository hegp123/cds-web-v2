import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import React, { Component } from "react";
import "../../css/alert.css";
class ModalPrint extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        size="lg"
        backdrop="false"
        keyboard="false"
        centered="false"
        className="modal-print"
      >
        <ModalHeader toggle={this.props.toggle} className="body-header" />

        <ModalBody className="pop-up-padding">
          <div className="navbar navbar-default navbar-fixed-top subHeader">
            <div className="navbar-header">
              <div className="container">Reimprimir Orden de Recibo</div>
            </div>
          </div>

          <div class="list-group, list-print">
            <a href="#" class="list-group-item list-group-item-action">
              <div className="container">
                <div className="row">
                  <div className="label-name">
                    <b>OR No.:</b> {this.props.order}
                  </div>
                </div>
                <div className="row">
                  <div className="label-popup">
                    <b>Cliente:</b> {this.props.customer}
                  </div>
                </div>
                <div className="row">
                  {" "}
                  <div className="label-popup">
                    <b>Fecha:</b> {this.props.dateOrder}
                  </div>
                </div>
                <div className="row">
                  <div className="label-popup">
                    <b>Total:</b> {this.props.total} {"$"}
                  </div>
                </div>
              </div>
            </a>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default ModalPrint;
