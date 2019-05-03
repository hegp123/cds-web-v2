import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "../../css/Alert.css";
import { numberFilter } from "../../utils/Utils";
import ButtonFmb from "./../ButtonFmb";

class ModalReport extends Component {
  constructor(props) {
    super(props);
  }

  alertar() {
    this.props.setMasterChanged();
  }

  render() {
    var paymentList = Array.from(this.props.payments).map(function(pago) {
      return (
        <div className="list-group-item">
          <div className="container">
            <div className="row">
              <div className="label-name">
                <b>O.R no.</b>
                {pago.factura}
              </div>
            </div>
            <div className="row">
              <div className="label-popup">
                <b>{pago.mostrar ? "Valor pagado" : "ANULADA"} </b>
                {pago.mostrar ? pago.valor : ""}
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <Modal isOpen={this.props.isOpen} size="lg" className="modal-print">
        <ModalHeader toggle={this.props.toggle} className="body-header" />

        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="popup-container">
                <b>Punto de recaudo:</b> {this.props.collectionPoint}
              </div>
            </div>
            <div className="row">
              <div className="popup-container">
                <b>Total pagado:</b> {this.props.totalPaid}
              </div>
            </div>
          </div>
          <div className="list-group, list-print">{paymentList}</div>
          <br />
          <div className="container">
            <div className="form-group">
              <ButtonFmb name="Imprimir" disabled="true" icon="fas fa-print" />
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default ModalReport;
