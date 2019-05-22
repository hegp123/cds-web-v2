import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "../../css/Alert.css";
import { numberFilter } from "../../utils/Utils";
import ButtonFmb from "./../ButtonFmb";

class ModalReport extends Component {
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
                <b>OR No.:</b>
                {pago.factura}
              </div>
            </div>
            <div className="row">
              <div className="label-popup">
                <b>{pago.mostrar ? "Valor pagado:" : "ANULADA"} </b>
                {pago.mostrar ? "$" + numberFilter(pago.valor) + ",00" : ""}
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <Modal isOpen={this.props.isOpen} size="lg" className="modal-print">
        <ModalHeader toggle={this.props.toggle} className="body-header" />

        <ModalBody className="pop-up-padding">
          <div className="navbar navbar-default navbar-fixed-top subHeader">
            <div className="navbar-header">
              <div className="container">Reporte de pagos</div>
            </div>
          </div>

          <div className="container list-print">
            <div className="row">
              <div className="popup-container">
                <b>Fecha:</b> {this.props.datePayment}
              </div>
            </div>
            <div className="row">
              <div className="popup-container">
                <b>Punto de recaudo:</b> {this.props.collectionPoint}
              </div>
            </div>
            <div className="row">
              <div className="popup-container">
                <b>Total pagado:</b>{" "}
                {"$" + numberFilter(this.props.totalPaid) + ",00"}
              </div>
            </div>
          </div>

          <div className="list-group  list-print">{paymentList}</div>
          <br />
          <div className="container ">
            <div className="list-print">
              <div className="row">
                <ButtonFmb
                  name="Imprimir"
                  disabled={false}
                  icon="fas fa-print"
                />
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

export default ModalReport;
