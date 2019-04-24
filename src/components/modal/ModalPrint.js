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
                    <b>Nombre del cliente:</b> MIE
                  </div>
                </div>
                <div className="row">
                  {" "}
                  <div className="label-popup">
                    <b>Cédula:</b> 82.990{" "}
                  </div>
                </div>
                <div className="row">
                  <div className="label-popup">
                    <b>Producto:</b> Fundacredito Activos Fijos{" "}
                  </div>
                </div>
                <div className="row">
                  <div className="label-popup">
                    <b>Crédito:</b> 121212{" "}
                  </div>
                </div>
                <div className="row">
                  <div className="label-popup">
                    <b>Valor cuota:</b> $82.990,00{" "}
                  </div>
                </div>
                <div className="row">
                  <div className="label-popup">
                    <b>Fecha de vencimiento:</b> Diciembre 10 de 2008{" "}
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
