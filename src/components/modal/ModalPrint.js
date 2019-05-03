import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "../../css/Alert.css";
import { withRouter } from "react-router";

import { AppContext } from "../../context/AppContext";
import { numberFilter } from "../../utils/Utils";

class ModalPrint extends Component {
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
          <div className="navbar navbar-default navbar-fixed-top subHeader">
            <div className="navbar-header">
              <div className="container">Reimprimir Orden de Recibo</div>
            </div>
          </div>

          <div className="list-group, list-print">
            <a
              href="#"
              className="list-group-item list-group-item-action"
              onClick={this.alertar.bind(this)}
            >
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
                    <b>Total:</b>
                    {"$" + numberFilter(this.props.total)}
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

ModalPrint.contextType = AppContext;
ModalPrint = withRouter(ModalPrint);

export default ModalPrint;
